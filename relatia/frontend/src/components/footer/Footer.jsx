import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import "./footer.css"; //Estilos del componente
import LanguageSwitcher from "../public/LanguageSwitcher"; //Componente para cambiar el idioma

const Footer = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro

  return (
    <footer className="footer">
  <div>
    <span>{t("titleRegister")} |</span>
    <span> Jesús García Fernández |</span>
    <span>
      {" "}
      {t("projectSentence")}
      <a href="https://codespaceacademy.com/s" target="_blank" rel="noopener noreferrer">
        Codespace Academy
      </a>
    </span>
    {/* Íconos sociales */}
    <div className="social-icons">
      {/* Enlaces a redes sociales */}
      {/* Íconos */}
    </div>
    <div className="footer-text">
      <p>{t("footerText")}</p>
    </div>


<div className="icons">
        <a
          href="https://github.com/anexions"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="#F4511E"
              d="M42.2,22.1L25.9,5.8C25.4,5.3,24.7,5,24,5c0,0,0,0,0,0c-0.7,0-1.4,0.3-1.9,0.8l-3.5,3.5l4.1,4.1c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3c0,0.5-0.1,0.9-0.3,1.3l4,4c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3s-1.3,3-3,3c-1.7,0-3-1.3-3-3c0-0.5,0.1-0.9,0.3-1.3l-4-4c-0.1,0-0.2,0.1-0.3,0.1v10.4c1.2,0.4,2,1.5,2,2.8c0,1.7-1.3,3-3,3s-3-1.3-3-3c0-1.3,0.8-2.4,2-2.8V18.8c-1.2-0.4-2-1.5-2-2.8c0-0.5,0.1-0.9,0.3-1.3l-4.1-4.1L5.8,22.1C5.3,22.6,5,23.3,5,24c0,0.7,0.3,1.4,0.8,1.9l16.3,16.3c0,0,0,0,0,0c0.5,0.5,1.2,0.8,1.9,0.8s1.4-0.3,1.9-0.8l16.3-16.3c0.5-0.5,0.8-1.2,0.8-1.9C43,23.3,42.7,22.6,42.2,22.1z"
            />
          </svg>
        </a>{" "}
        <a
          href="https://www.linkedin.com/in/jfernandezfullstack/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="#0288D1"
              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
            />
            <path
              fill="#FFF"
              d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
            />
          </svg>
        </a>
        <LanguageSwitcher />
       </div>
      </div>
    </footer>
  );
};

export default Footer;
