import useAuth from "../../../hooks/useAuth";
import { globalConfiguration } from "../../../helpers/globalConfiguration";
import { useEffect, useState } from "react";
import { UserImage } from "../../../helpers/UserImage";
import { isAuthenticated } from "../../../helpers/authData";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./feed.css";
import "animate.css";

const Feed = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  const { auth } = useAuth(); //Llamamos a la función useAuth que nos devuelve el usuario logueado

  //Estados creados con usteState
  const [publications, setPublications] = useState([]); //Array como el de escritores pero con publicaciones. Lo iniciamos vacío porque no sabemos cuantas publicaciones habrá.
  const [fullStoryId, setFullStoryId] = useState(null); //Esto es para el botón de leer más.

  useEffect(() => {
    //UseEffect para cargar las publicaciones nada más cargar la página
    const fetchPublications = async () => {
      const auth = isAuthenticated(); //Esto es el help que cree para no repetir.
      if (!auth) {
        return null;
      }

      const { token } = auth;

      const response = await fetch(
        `${globalConfiguration.url}publication/feed/1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      setPublications(data.publications || []); //Si no hay publicaciones devolverá un array vacío.
    };

    fetchPublications(); //Llamamos a la función
  }, []); //Array vacío para que solo se ejecute una vez.

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

  return (
    <div className="feed-container">
      <div>
        <div>
          <div>
            <div>
              <div className="image-feed">{UserImage()}</div>
              <h1 className="feed-title animate__animated animate__bounceInDown">
                {t("titleHome")} {auth.nick} {t("titleHome02")}
              </h1>
              <p className="feed-description animate__animated animate__bounceInDown">
                {t("homeDescription")}
              </p>
            </div>
            <div>
              {publications.length === 0 ? (
                <p className="feed-description">
                  <strong>
                    {t("noStories")}{" "}
                    <NavLink to="/social/writers" className="feed-link">
                      {t("writerPage")}
                    </NavLink>{" "}
                    {t("noStories02")}
                  </strong>
                </p>
              ) : (
                publications
                  .slice()
                  .reverse()
                  .map((publication) => {
                    const showFullStory = publication._id === fullStoryId;
                    const storyContent = showFullStory
                      ? publication.story
                      : publication.story.length > 100
                      ? publication.story.substring(0, 100) + "..."
                      : publication.story;

                    return (
                      <div key={publication._id} className="publication-card">
                        <div className="">
                          <div className="">
                            <div className=""></div>
                            <p className="">
                              <img
                                src={`${globalConfiguration.url}user/avatar/${publication.user.image}`}
                                alt="User Avatar"
                                className="user-avatar"
                              />
                              <strong>{publication.user.nick}</strong>
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <h2 className="publication-title">
                            {publication.name}
                          </h2>

                          <h3 className="publication-title-feed">
                            {publication.title}
                          </h3>
                          <h3 className="publication-description">
                            {publication.description}
                          </h3>

                          <p className="publication-story">
                            <small>{storyContent}</small>
                          </p>
                          <div className="cover-principalButton">
                            <button
                              className="btn-principal"
                              onClick={() => viewFullstory(publication._id)}
                            >
                              {showFullStory
                                ? t("readMoreButtonHide")
                                : t("readMoreButtonMore")}
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
      </div>
    </div>
  );
};
export default Feed;
