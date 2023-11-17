import { useTranslation } from "react-i18next";
import EnLangImage from "../../assets/img/EnLang.png";
import EsLangImage from "../../assets/img/EsLang.png";
//Esto es una función definida en i18n.js viene todo hecho.

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      {/* Botón para el idioma inglés */}
      <button className="langButton" onClick={() => changeLanguage("en")}>
        <img src={EnLangImage} alt="Español" className="imgLang" />
      </button>

      {/* Botón para el idioma español */}
      <button className="langButton" onClick={() => changeLanguage("es")}>
        <img src={EsLangImage} alt="Español" className="imgLang" />
      </button>
    </div>
  );
}

export default LanguageSwitcher;
