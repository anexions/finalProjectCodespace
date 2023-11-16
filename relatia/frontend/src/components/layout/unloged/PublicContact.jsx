import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import "../loged/contact.css"; //Estilos para el formulario de contacto

const PublicContact = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  return (
    <div className="contact-container">
      <div className="">
        <div className="">
          <div className="contact-title">
            <h1>{t("titleContact")}</h1>
          </div>

          <div className="contact-description">
            <p>{t("contactDescription")}</p>

            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control border-0 shadow-sm"
                  name="name"
                  placeholder={t("placeHolderEmail")}
                  aria-label="Email"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control limitedH border-0 shadow-sm"
                  name="message"
                  placeholder={t("placeHolderMessage")}
                  aria-label="Message"
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn-principal"
                >
                  {t("sendButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicContact;
