import { useEffect } from "react"; //Importamos useEffect para ejecutar código cuando se renderiza el componente
import { useNavigate } from "react-router-dom"; //Hook para navegar entre páginas
import useAuth from "../../../hooks/useAuth"; //Hook personalizado para manejar el estado de la autenticación y tener los datos del usuario en el local storage
import { useTranslation } from "react-i18next"; //Funcion para las traducciones

const Logout = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  const { setAuth } = useAuth(); //Llamada a la función para guardar los datos del usuario en el local storage
  const navigate = useNavigate(); //Llamamos al hook para navegar entre páginas

  useEffect(() => {
    localStorage.clear(); //Vaciará el local storage

    setAuth({}); //Vaciará el estado de la autenticación

    navigate("/login"); //Redirigirá a la página de login
  });

  return (
    <div>
      <h1>{t("closeSesion")}</h1>
    </div>
  );
};

export default Logout;
