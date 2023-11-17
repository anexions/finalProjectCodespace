import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import "../../private/privateContact/contact.css"; //Estilos para el formulario de
import { useState } from "react"; //Importamos useState para poder usar el estado
import useForm from "../../../hooks/useForm"; //Hook personalizado para capturar los valores de los campos del formulario
import { ApiSaveEmail } from "../../../helpers/ApiService"; //Importamos la función para registrar usuarios (del archivo de todas las peticiones)

const PublicContact = () => {
  const { t } = useTranslation();
  const { form, changed } = useForm({
    email: '', // Inicializa el estado del formulario con valores por defecto
    message: '',
  }); //Llamamos al hook para capturar los valores de los campos del formulario, form es el objeto con los valores y changed es la función p
  const [message, setMessage] = useState(null); //Mensaje de confirmación de envío
  
  

  const saveEmail = async (e) => {
    e.preventDefault(); //Prevenimos el recargado de la página
     // Validación de campos vacíos
     if (!form.email.trim() || !form.message.trim()) {
      setMessage("errorBlankSpaces");
      return;
    }
    let newEmail = form; //Guardamos los datos del formulario en la variable newUser

    //Validamos el formulario con un test llamado emailRegex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email. Tiene que ser algo@loquesea.algo
    if (!emailRegex.test(newEmail.email)) {
      //Si el email del usuario no pasa la validación(test)
      setMessage("error_email_format"); //Marcamos el error y lo cargamos al estado para mostrar el mensaje.
      return; // Detenemos la ejecución si el email no es válido
    }

    const data = await ApiSaveEmail(form); //Hemos sacado la petición al archivo ApiService.jsx para tenerlo todo más ordenado.
    //Decimos que la variable data = a la función ApiRegisterUser que está en ApiService.jsx y le pasamos el formulario.

    if (data.status == "success") {
      setMessage("Emailsaved"); //Si es éxito, cargamos el estado para mostrar el mensaje de que ha ido todo bien.
    } else {
      setMessage("error"); //Si no, mostramos un error.
    }
  };

  return (
    <div className="contact-container">
      <div className="">
        <div className="">
          <div className="contact-title">
            <h1>{t("titleContact")}</h1>
          </div>

          <div className="contact-description">
            <p>{t("contactDescription")}</p>
            <div className="mb-3">
              {message === "Emailsaved" ? (
                <div className="alert alert-success mt-3">{t("emailSend")}</div>
              ) : (
                ""
              )}
              {message === "errorBlankSpaces" ? (
                <div className="alert alert-danger mt-3">
                  {t("blankSpaces")}
                </div>
              ) : (
                ""
              )}
              {message === "error_email_format" ? (
                <div className="alert alert-danger mt-3">
                  {t("errorEmailFormat")}
                </div>
              ) : (
                ""
              )}
            </div>
            <form onSubmit={saveEmail}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control border-0 shadow-sm"
                  name="email"
                  value={form.email}
                  placeholder={t("placeHolderEmail")}
                  aria-label="Email"
                  onChange={changed}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control limitedH border-0 shadow-sm"
                  name="message"
                  value={form.message}
                  placeholder={t("placeHolderMessage")}
                  onChange={changed}
                  aria-label="Message"
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn-principal">
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
