import { NavLink } from "react-router-dom"; //Importamos NavLink para poder usarlo en el botón de login
import { useForm } from "../../../hooks/useForm"; //Importamos el hook useForm para poder usarlo en el formulario
import { useState } from "react"; //Importamos useState para poder usarlo en los estados
import { useTranslation } from "react-i18next"; //Importamos la función para las traducciones
import { ApiRegisterUser } from "../../../helpers/ApiService"; //Importamos la función para registrar usuarios (del archivo de todas las peticiones)
import "./register.css"; //Importamos el css de Register

const Register = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro

  const [saved, setSaved] = useState(null); //Creamos los estados para mostrar los mensajes al registrar usuarios.
  const initialState = {
    name: "",
    nick: "",
    email: "",
    password: "",
  };

  const { form, changed } = useForm({ initialState }); //Usamos {} porque no tenemos ningún valor inicial y es un objeto vacío.

  //FUNCION PARA REGISTRAR UN USUARIO
  const saveUser = async (e) => {
    e.preventDefault(); //Prevenimos el recargado de la página
    let newUser = form; //Guardamos los datos del formulario en la variable newUser

    // Validación para asegurarse de que el nombre no sea solo espacios en blanco
    if (!form.name?.trim() || !form.nick?.trim() || !form.email?.trim()) {
      setSaved("errorBlankSpaces"); // Marcamos el error y lo cargamos al estado para mostrar el mensaje.
      return; // Detenemos la ejecución si el nombre solo tiene espacios en blanco
    }

    //Validamos el formulario con un test llamado emailRegex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email. Tiene que ser algo@loquesea.algo
    if (!emailRegex.test(newUser.email)) {
      //Si el email del usuario no pasa la validación(test)
      setSaved("error_email_format"); //Marcamos el error y lo cargamos al estado para mostrar el mensaje.
      return; // Detenemos la ejecución si el email no es válido
    }

    const data = await ApiRegisterUser(form); //Hemos sacado la petición al archivo ApiService.jsx para tenerlo todo más ordenado.
    //Decimos que la variable data = a la función ApiRegisterUser que está en ApiService.jsx y le pasamos el formulario.

    if (data.status == "success") {
      setSaved("saved"); //Si es éxito, cargamos el estado para mostrar el mensaje de que ha ido todo bien.
    } else {
      setSaved("error"); //Si no, mostramos un error.
    }
  };

  return (
    <div className="register-container">
      <div className="">
        <h1>{t("titleRegister")}</h1>
      </div>
      <div className="col-md-4 registerForm">
        <p className="mb-4 text-center">
          <strong className="register-title">{t("titleRegister")}</strong>
        </p>
        {saved === "saved" && (
          <strong className="alert alert-success form-control">
            {t("registerSuccess")}{" "}
            <NavLink to="/login">{t("loginButton")}</NavLink>
          </strong>
        )}
        {saved === "error" && (
          <strong className="alert alert-danger form-control">
            {t("errorRegister")}
          </strong>
        )}
        {saved === "errorBlankSpaces" && (
          <strong className="alert alert-danger form-control">
            {t("errorBlankSpaces")}
          </strong>
        )}
        {saved === "error_email_format" && (
          <strong className="alert alert-danger form-control">
            {t("errorEmailFormat")}
          </strong>
        )}
        <form onSubmit={saveUser}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder={t("placeHolderName")}
              onChange={changed}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="nick"
              placeholder={t("placeHolderNick")}
              onChange={changed}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder={t("placeHolderEmail")}
              onChange={changed}
            />
          </div>
          <div className="mb-4 position-relative">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder={t("placeholderPassword")}
              onChange={changed}
            />
          </div>
          <div className="d-grid">
            <button className="btn-principal">{t("registerButton")}</button>
          </div>
        </form>
        <div className="register-description">
          {t("alreadyAccount")}{" "}
          <NavLink to="/login"> {t("loginButton")}</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
