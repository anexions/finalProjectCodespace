//Esto es una librería que nos permite traducir la página web a diferentes idiomas.
//Solo tengo que cambiar el loadPath por la ruta de la api que he creado para las traducciones.
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "es"],
    fallbackLng: "en",
    detection: {
      order: ["querystring", "cookie", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
