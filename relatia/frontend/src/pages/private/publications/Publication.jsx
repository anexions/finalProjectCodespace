import { useState, useEffect } from "react"; //Funciones para manejar el estado y el ciclo de vida de los componentes
import useAuth from "../../../hooks/useAuth"; //Funcion para manejar el estado de la autenticación
import { useForm } from "../../../hooks/useForm"; //Funcion para manejar el estado de los formularios
import { globalConfiguration } from "../../../helpers/globalConfiguration"; //Funcion propia para manejar la configuración global
import { isAuthenticated } from "../../../helpers/authData"; //Funcion propia para manejar la autenticación
import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import ConfirmModal from "../../../components/modals/ConfirmModal"; //Funcion para el modal de confirmación
import "./publication.css"; //Estilos del componente
import "../../../components/modals/modal.css"; //Estilos del modal

const Publication = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  const { auth } = useAuth({}); //Llamada a la función para manejar el estado de la autenticación
  const { form, changed, resetForm, setValues } = useForm({
    //Llamada a la función para manejar el estado de los formularios
    title: "", //Valores iniciales del formulario vacíos
    description: "",
    story: "",
  });
  const [stored, setStored] = useState(null); //Estado para manejar el mensaje de guardado
  const [publications, setPublications] = useState([]); //Estado para manejar las publicaciones(el array que las muestra)
  const [fullStoryId, setFullStoryId] = useState(null); //Estado para manejar la historia completa
  const [isModalOpen, setModalOpen] = useState(false); //Estado para manejar el modal de confirmación
  const [modalContent, setModalContent] = useState({ title: "", message: "" }); //Estado para manejar el contenido del modal de confirmación
  const [editingPublicationId, setEditingPublicationId] = useState(null); //Aqui se muestra si se está o no editando una publicación
  const [publicationIdToDelete, setPublicationIdToDelete] = useState(null);
  const [publicationIdToEdit, setPublicationIdToEdit] = useState(null);
  const [handleConfirm, setHandleconfirm] = useState(null);

  // Función para abrir el modal con contenido específico
  const openModal = (title, message) => {
    setModalContent({ title, message });
    setModalOpen(true);
    console.log("Modal abierto", isModalOpen);
  };

  // Cargar las publicaciones del usuario nada más arrancar el componente
  useEffect(() => {
    const fetchPublications = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!token || !user) {
        return;
      }

      const response = await fetch(
        `${globalConfiguration.url}publication/userlist/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      setPublications(data.publications || []);
    };

    fetchPublications();
  }, []);

  //FUNCION PARA GUARDAR PUBLICACIONES-------------------------------------------------
  //Vamos a diferenciar si se edita o es una nueva (Haremos un PUT o un POST)
  const savePublication = async (e) => {
    e.preventDefault();

    const auth = isAuthenticated();
    if (!auth) {
      return null;
    }

    const { token } = auth;

    // Validación para asegurarse de que no pone solo espacios en blanco.
    if (!form.title.trim() || !form.description.trim() || !form.story.trim()) {
      setStored("errorBlankSpaces"); // Marcamos el error y lo cargamos al estado para mostrar el mensaje.
      return; // Detenemos la ejecución si el nombre solo tiene espacios en blanco
    }

    if (editingPublicationId) {
      // Modo de edición: Actualizar la publicación existente
      const request = await fetch(
        `${globalConfiguration.url}publication/edit/${editingPublicationId}`, //Aqui se hace el PUT
        {
          method: "PUT",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json(); //Aqui se recibe la respuesta del servidor en la variable response

      if (response.message === "Publication edited correctly.") {
        setStored("stored"); // Marcamos el guardado y lo cargamos al estado para mostrar el mensaje.
        resetForm(); // Resetea el formulario
        setEditingPublicationId(null); // Resetea el id de la publicación que se está editando
        // Actualiza la lista de publicaciones
        setPublications(
          (
            prevPublications //Aqui se actualiza la lista de publicaciones
          ) =>
            prevPublications.map(
              //Aqui se mapea la lista de publicaciones
              (
                pub //Nombre que le damos a cada publicación dentro del array
              ) =>
                pub._id === editingPublicationId ? response.publication : pub //Aqui se comprueba si el id de la publicación es igual al id de la publicación que
              //se está editando, si es así, se actualiza la publicación, si no, se deja como está
            )
        );
      } else {
        console.log("Error in response or not OK.");
      }
    } else {
      // Modo de creación: Guardar nueva publicación
      let newPublication = form;
      const request = await fetch(
        `${globalConfiguration.url}publication/save`,
        {
          method: "POST",
          body: JSON.stringify(newPublication),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      console.log("Server Response:", response);

      if (response.message === "Story saved correctly.") {
        setStored("stored");
        resetForm();
        setPublications((prevPublications) => [
          ...prevPublications,
          response.publicationStored,
        ]);
      } else {
        console.log("Error in response or not OK.");
        setStored("not_stored");
      }
    }
  };

  //FUNCION PARA ELIMINAR PUBLICACIONES-------------------------------------------------

  const deletePublication = async (e) => {
    const publicationId = e.target.dataset.id; // Obtener el ID desde el evento
    //Abrimos el modal de confirmación
    openModal(t("modalDeleteTittle"));
    setHandleconfirm("handleConfirmDelete");
    setPublicationIdToDelete(publicationId);
  };
  //FUNCION PARA SBER SI ESTAMOS EDITANDO O ELIMINANDO EN EL MODAL DE CONFIRMACIÓN-------------------------------------------------
  const editOrDeletePublication = async () => {
    if (handleConfirm === "handleConfirmDelete") {
      handleConfirmDelete();
    } else if (handleConfirm === "handleConfirmEdit") {
      handleConfirmEdit();
    }
  };

  //FUNCION ACEPTAR ELIMINAR EN EL MODAL DE CONFIRMACIÓN-------------------------------------------------
  const handleConfirmDelete = async () => {
    if (!publicationIdToDelete) return;

    const token = localStorage.getItem("token");
    // Asume que necesitas autenticación para realizar la acción
    if (!token) {
      console.log("Error: No token");
      return;
    }

    try {
      const response = await fetch(
        `${globalConfiguration.url}publication/delete/${publicationIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Actualiza el estado para reflejar que la publicación ha sido eliminada
      setPublications(
        publications.filter((pub) => pub._id !== publicationIdToDelete)
      );
      setPublicationIdToDelete(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      // Manejar el error adecuadamente
    }
  };

  //FUNCION PARA EDITAR PUBLICACIONES EN EL MODAL-------------------------------------------------

  const editPublication = async (e) => {
    const publicationId = e.target.dataset.id; // Obtener el ID desde el evento
    //Abrimos el modal de confirmación
    openModal(t("modalEditTittle"));
    setHandleconfirm("handleConfirmEdit");
    setPublicationIdToEdit(publicationId);
  };

  const handleConfirmEdit = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      return;
    }

    // Suponiendo que publicationIdToEdit es el ID de la publicación que deseas editar

    const publicationToEdit = publications.find(
      (pub) => pub._id === publicationIdToEdit
    );

    if (publicationToEdit) {
      setEditingPublicationId(publicationToEdit._id);
      setValues({
        title: publicationToEdit.title,
        description: publicationToEdit.description,
        story: publicationToEdit.story,
      });
      setModalOpen(false);
    } else {
      alert("Error: Publication not found");
    }
  };

  //FUNCION DEL BOTÓN DE LEER MÁS---------------------------------------------------
  const viewFullstory = (id) => {
    //Le pasamos el id de la publicación
    if (fullStoryId === id) {
      //Si el id de la publicación es igual al id de la publicación que tenemos en el estado
      setFullStoryId(null); //Ponemos el estado a null para que se oculte el texto
    } else {
      //Si no
      setFullStoryId(id); //Ponemos el estado con el id de la publicación para que se muestre el texto
    }
  };

  //  RETURN DEL COMPONENTE----------------------------------------------------------------------------------------------------------

  return (
    <div className="publication-container">
      <div className="modal-container">
        <ConfirmModal
          isOpen={isModalOpen}
          title={modalContent.title}
          handleConfirm={editOrDeletePublication}
          handleCancel={() => setModalOpen(false)}
        />
      </div>

      <h1 className="publication-title">{t("publicationTitle")}</h1>

      <div className="">
        <div className="publication-form">
          <form id="publicationForm" onSubmit={savePublication}>
            <div className="mb-3">
              <input
                type="text"
                name="title"
                placeholder={t("placeHolderTitle")}
                className="form-control"
                onChange={changed}
                value={form.title}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="description"
                placeholder={t("placeHolderDescription")}
                className="form-control"
                rows="3"
                onChange={changed}
                value={form.description}
              ></textarea>
            </div>
            <div className="mb-3">
              <textarea
                name="story"
                placeholder={t("placeHolderContent")}
                className="form-control limitedH"
                rows="5"
                onChange={changed}
                value={form.story}
              ></textarea>
            </div>
            <div className="div-btn-principal">
              <button type="submit" className="btn-principal">
                {t("buttonSave")}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mb-3">
        {stored === "stored" && (
          <div className="alert alert-success form-control" role="alert">
            {t("saveStorySuccess")}
          </div>
        )}
        {stored === "not_stored" && (
          <div className="alert alert-danger form-control" role="alert">
            {t("errorSaveStory")}
          </div>
        )}
        {stored === "errorBlankSpaces" && (
          <div className="alert alert-danger form-control" role="alert">
            {t("blankSpacesPublishError")}
          </div>
        )}
      </div>

      <h2 className="publication-title">{t("storiesList")}</h2>
      <div className="">
        <div className="publication-no-Stories">
          {publications.length === 0 ? (
            <p className="publication-title">{t("noStoriesList")}</p>
          ) : (
            publications
              .slice()
              .reverse()
              .map((publication, index) => {
                const showFullStory = publication._id === fullStoryId;
                const storyContent = showFullStory
                  ? publication.story
                  : publication.story.length > 100
                  ? publication.story.substring(0, 100) + "..."
                  : publication.story;

                return (
                  <div key={publication._id} className="publication-container-stories">
                    <div className="card-body">
                      <p className="publication-description">
                        {t("number")} {index + 1}
                      </p>
                      <h2 className="card-title">{publication.title}</h2>
                      <p className="card-text">{publication.description}</p>
                      <p className="card-text">
                        <small>{storyContent}</small>
                      </p>
                      <div className="btn-principal-div">
                        <button
                          className="btn-principal"
                          onClick={() => viewFullstory(publication._id)}
                        >
                          {fullStoryId !== publication._id
                            ? t("readMoreButtonMore")
                            : t("readMoreButtonHide")}
                        </button>
                      </div>

                      <div className="btn-dlete-edit">
                        <button
                          className="btn-edit"
                          onClick={editPublication}
                          data-id={publication._id}
                        >
                          {t("editButton")}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={deletePublication}
                          data-id={publication._id}
                        >
                          {t("deleteButton")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default Publication;
