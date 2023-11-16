import { useState, useEffect } from "react"; //Importamos useState y useEffect
import { globalConfiguration } from "../../../helpers/globalConfiguration"; //Importamos la url de la API
import Avatar from "../../../assets/img/user.png"; //Importamos la imagen de avatar si el usuario no tiene una cargada.
import {
  //Importamos las funciones de la API que las saque a otro archivo para que no estuvieran aquí (ApiService.js)
  ApiFetchWriters,
  ApiFollowWriter,
  ApiUnfollowWriter,
  ApiFetchFollowedWriters,
} from "../../../helpers/ApiService";
import { getToken } from "../../../helpers/GetToken"; //Importamos la función para obtener el token que también la saqué fuera.
import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import Modal from "../permanent/Modal"; //Importamos el componente Modal y lo editamos para que se adapte a lo que necesitamos.
import "../permanent/modal.css"; //Importamos el css del modal
import "./writerCard.css"; //Importamos el css de este componente
import "../permanent/modal.css"; //Importamos el css del modal

export const WriterCard = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  const [writers, setWriters] = useState([]); //Declaramos el estado de los escritores, es un array vacío que se llenara con la lista de escritores
  const [error, setError] = useState(""); //Estado de error, string vacío que se llenara con el error si lo hay. Podemos poner el valor que queramos para mostar mensajes.
  const [isModalOpen, setIsModalOpen] = useState(false); //Estado para saber si el modal está abierto o no
  const [modalMessage, setModalMessage] = useState(""); //Estado para el mensaje del modal que ponemos lo que queramos.

  //UseEffect para cargar los escritores nada más cargar la página
  useEffect(() => {
    const fetchWriters = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const writerData = await ApiFetchWriters(token);
        const followedData = await ApiFetchFollowedWriters(token);
        const userLogged = JSON.parse(localStorage.getItem("user"));

        let filteredWriters = writerData.users.filter(
          (writer) => writer._id !== userLogged.id
        );

        // Crear un array de IDs de escritores seguidos
        const followedWriterIds = followedData.following.map(
          (item) => item.followed._id
        );

        // Marcar los escritores seguidos
        filteredWriters = filteredWriters.map((writer) => {
          const isFollowed = followedWriterIds.includes(writer._id);
          return { ...writer, isFollowed };
        });

        setWriters(filteredWriters);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchWriters();
  }, []);
  //Con el array vacío le decimos que solo se ejecute una vez, si le pasamos una variable se ejecutará cada vez que cambie esa variable.

  //FUNCION PARA SEGUIR A UN ESCRITOR------------------------------------------
  const followWriter = async (writerId) => {
    const token = getToken();
    if (!token) return;

    try {
      await ApiFollowWriter(writerId, token);
      setModalMessage(t("followMessage"));
      setIsModalOpen(true);

      // Actualizar la lista de escritores con el nuevo estado de seguimiento
      setWriters(
        writers.map((writer) => {
          if (writer._id === writerId) {
            return { ...writer, isFollowed: true };
          }
          return writer;
        })
      );
    } catch (e) {
      setModalMessage(t("errorFollowMessage"));
      setIsModalOpen(true);
    }
  };

  const unfollowWriter = async (writerId) => {
    const token = getToken();
    if (!token) return;

    try {
      await ApiUnfollowWriter(writerId, token);
      setModalMessage(t("unfollowMessage"));
      setIsModalOpen(true);

      // Actualizar la lista de escritores con el nuevo estado de seguimiento
      setWriters(
        writers.map((writer) => {
          if (writer._id === writerId) {
            return { ...writer, isFollowed: false };
          }
          return writer;
        })
      );
    } catch (e) {
      setModalMessage(t("errorFollowMessage"));
      setIsModalOpen(true);
    }
  };

  //Función para cerrar el modal que se asigna al botón de cerrar
  const closeModal = () => {
    setIsModalOpen(false); //Cerramos el modal volviendo el estado a false
  };

  //El mapeo de writers lo estamos sacando de la funcion fetchWriters que es la que hace la petición a la API
  //El css de este componente hace referencia al padre writer.jsx
  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {t(error)}
        </div>
      )}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>{t(modalMessage)}</h2>
        <button
          className="btn-principal"
          onClick={closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal>
      {writers.length > 0 ? (
        <div className="writer-card">
          {writers.map((writer) => (
            <div key={writer._id} className="writer-card">
              <div className="card">
                <div className="card-body">
                  <div>
                    <img
                      src={
                        writer.image !== "default.png"
                          ? `${globalConfiguration.url}user/avatar/${writer.image}`
                          : Avatar
                      }
                      alt="avatarImage"
                      className="img-fluid rounded-circle imageProfileSelf mb-2"
                    />
                    <h5 className="card-title text-center">{writer.nick}</h5>
                    <p className="card-text">{writer.bio}</p>
                    <div className="botones">
                      {!writer.isFollowed && (
                        <button
                          className="btn-principal"
                          onClick={() => followWriter(writer._id)}
                        >
                          {t("followButton")}
                        </button>
                      )}
                      {writer.isFollowed && (
                        <button
                          className="btn-secundario"
                          onClick={() => unfollowWriter(writer._id)}
                        >
                          {t("unfollowButton")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="writer-subTittle">{t("noWriters")}</h1>
      )}
    </div>
  );
};
