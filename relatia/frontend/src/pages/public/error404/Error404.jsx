import { NavLink } from "react-router-dom"; //Importamos el NavLink para poder usarlo y navegear entre páginas
import img404 from "../../../assets/img/404.png"; //Importamos la imagen de la página de error
import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import "./error404.css"; //Importamos el css de Error404

const Error404 = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro

  return (
    <div>
      <div className="container-404">
        <h1 className="tittle-404">{t("error404")}</h1>
        <p>{t("pageNotFound")}</p>
        <div>
          <img src={img404} alt="logo"/>
        </div>
        <NavLink to="/" className="link-404 btn-principal">{t("backButton")}</NavLink>
      </div>
    </div>
  );
};

export default Error404;
