import { NavLink } from "react-router-dom"; // Navlink nos permite navegar entre páginas sin recargar la página completa
import useForm from "../../../hooks/useForm"; //Hook personalizado para capturar los valores de los campos del formulario
import { globalConfiguration } from "../../../helpers/globalConfiguration"; //Un archivo con la url del backend para no repetir tanto.
import { useState, useEffect } from "react"; //Hook para manejar estados y el hook para ejecutar código cuando se renderiza el componente
import useAuth from "../../../hooks/useAuth"; //Hook personalizado para manejar el estado de la autenticación y tener los datos del usuario en el local storage
import { useNavigate } from "react-router-dom"; //Hook para navegar entre páginas
import getRandomImage from "../../../helpers/RandomImage"; //Función para obtener una imagen aleatoria al recargar la página de login
import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import "./login.css"; //Estilos del componente
import "animate.css"; //Librería para animaciones css

const Login = () => {
  //UseStates
  const [selectedImage, setSelectedImage] = useState(null); //State para guardar la imagen random, la declaramos vacía para que no de error al cargar la página
  const [loged, setLoged] = useState(""); //Estado para mostrar los mensajes de error o de login correcto. Lo inicializo vacío para que no muestre nada al cargar la página
  //Llamadas a funciones
  const { form, changed } = useForm({}); //Llamamos al hook para capturar los valores de los campos del formulario, form es el objeto con los valores y changed es la función para capturar los cambios
  const navigate = useNavigate(); //Llamamos al hook para navegar entre páginas
  const { setAuth } = useAuth(); //Llamada a la función para guardar los datos del usuario en el local storage
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro

  //useEffect para ejecutar código cuando se renderiza el componente
  useEffect(() => {
    const randomImage = getRandomImage(); //Llamamos a la función para obtener una imagen aleatoria
    setSelectedImage(randomImage); //Guardamos la imagen en el estado y luego en el div llamamos a ese estado
  }, []); // El arreglo vacío como segundo argumento asegura que useEffect se ejecute solo una vez al cargar la página.

  //FUNCION PARA HACER LOGIN
  const loginUser = async (e) => {
    e.preventDefault(); //Con este evitamos que el formulario se envíe por defecto y se recargue la página

    let userToLogin = form; //Guardamos lo datos recogidos del form en la variable userToLogin

    const request = await fetch(globalConfiguration.url + "user/login", {
      //Hacemos la petición al backend
      method: "POST", //El metodo post hará mandará datos al back. Crud: (Post, Get, Put, Delete)
      headers: {
        //Tipo de datos que vamos a enviar.
        "Content-Type": "application/json", //En este caso JSON
      },
      body: JSON.stringify(userToLogin), //Usamos el método stringify para convertir el objeto en un string
    });

    const data = await request.json(); //Guardamos la respuesta del back en una variable llamada data y trabajamos con ella.

    //Si tenemos respuesta de éxito del back, guardamos el token y los datos del usuario en el local storage y navegamos a la página del feed
    if (data.status == "success") {
      localStorage.setItem("token", data.token); //Guardamos el token en el local storage (Token que nos llega desde el Back.) Estamos usando Data
      localStorage.setItem("user", JSON.stringify(data.user)); //Guardamos los datos de usuario en el local storage. Estamos usando Data
      setLoged("login"); //Change the state of the login (we will use to show a message on the screen)
      setAuth(data.user); //Guardamos los datos del usuario en el local storage con el hook useAuth.
      navigate("/social/feed"); //Y le decimos donde vamos a navegar al hacer login.
    } else {
      setLoged("error"); //Si no podemos loguear, llenamos el estado de loged con error para mostrar un mensaje de error en la pantalla.
    }
  };

  return (
    <div className="login-container">
      <div>
        <h1 className="login-title animate__animated animate__bounceInDown">
          {t("welcome")}
        </h1>
        <p className="login-description animate__animated animate__bounceInDown">
          {t("description")}
        </p>
        <div className="mb-3">
          {loged === "login" ? (
            <div className="alert alert-success">{t("loginSuccess")}</div>
          ) : (
            ""
          )}
          {loged === "error" ? (
            <div className="alert alert-danger">{t("errorLogin")}</div>
          ) : (
            ""
          )}
        </div>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={changed}
              placeholder={t("placeHolderEmail")}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={changed}
              placeholder={t("placeholderPassword")}
            />
          </div>
          <div className="d-grid mb-3">
            <button className="btn-principal">{t("loginButton")}</button>
          </div>
          <div className="mb-2 login-description">
            {t("account")} <NavLink to="/register">{t("register")}</NavLink>
          </div>
        </form>
      </div>
      <div className="login-image">
        <img src={selectedImage} alt="login" className="imgLogin" />
      </div>
    </div>
  );
};

export default Login;
