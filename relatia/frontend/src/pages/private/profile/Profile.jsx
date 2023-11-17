import { useState, useEffect } from "react";
import Avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
import { globalConfiguration } from "../../../helpers/globalConfiguration";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "./profile.css";

const Profile = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  const { auth, setAuth } = useAuth({}); //Llamamos a la función useAuth que nos devuelve el usuario logueado
  const [error, setError] = useState(null); //Estado para los errores
  const [name, setName] = useState(auth.name); //Estado para el nombre (ya que se pueden cambiar)
  const [bio, setBio] = useState(auth.bio); //Estado para la bio (ya que se pueden cambiar)
  const [userChanged, setUserChanged] = useState(null); //Estado para los cambios del usuario y mostrar mensajes
  const [following, setFollowing] = useState([]); //Estado para los usuarios que sigues
  const [currentPassword, setCurrentPassword] = useState(); //Estado para la contraseña actual
  const [newPassword, setNewPassword] = useState(""); //Estado para la nueva contraseña
  const [newPass, setNewPass] = useState(null); //Estado para los mensajes de cambio de contraseña

  useEffect(() => {
    //UseEffect para cargar el perfil nada más cargar la página
    GetProfile();
  }, [auth]);

  const dateFormat = moment(auth.created_date).format("DD/MM/YYYY");

  const GetProfile = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      return false;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const request = await fetch(
        `${globalConfiguration.url}user/profile/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!request.ok) {
        throw new Error("Error fetching profile.");
      }

      const data = await request.json();

      setAuth(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  //Funcion para cambiar el avatar--------------------------------------------------

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setError("User not authenticated.");
      return;
    }

    const formData = new FormData(); //FormData es una clase de JS que nos permite crear un objeto que se envía como formulario
    formData.append("file0", file); //Añadimos el archivo al objeto formData

    try {
      const response = await fetch(globalConfiguration.url + "user/upload", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Error changing avatar.");
      }

      const data = await response.json();
      setAuth((prevAuth) => ({ ...prevAuth, image: data.user.image })); //Actualizamos el avatar
    } catch (err) {
      setError(err.message);
    }
  };

  //Funcion para guardar los cambios del perfil--------------------------------------------

  const saveFormChanges = async () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      return false;
    }

    if (!name && !bio) {
      //Prohibimos que el nombre y la bio sean vacíos
      setError("Please fill all the fields.");
      setUserChanged("false");
      return false;
    }

    if (!name.trim()) {
      //Prohibimos que el nombre y la bio sean solo espacios en blanco
      setUserChanged("errorBlankSpacesProfile");
      return false;
    }

    try {
      const response = await fetch(globalConfiguration.url + "user/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name,
          bio,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving changes.");
      }

      const data = await response.json();
      setName(data.user.name);
      setBio(data.user.bio);
      setUserChanged("true");
    } catch (err) {
      setError(err.message);
    }
  };

  //Funcion para cambiar la contraseña-------------------------------------------------

  const changePassword = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setError("User not authenticated.");
      return false;
    }

    if (!currentPassword || !newPassword) {
      setError("Please fill all the fields.");
      setNewPass(false);
      return false;
    }

    try {
      const response = await fetch(globalConfiguration.url + "user/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error changing password.");
        setNewPass(false);
        return;
      }

      if (data.status === "success") {
        setNewPass(true);
      } else {
        setError("Error changing password.");
        setNewPass(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setNewPass(false);
    }
  };

  useEffect(() => {
    const fetchUsersIFollow = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        return;
      }

      const response = await fetch(
        `${globalConfiguration.url}follow/following/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      setFollowing(data.following || []);
    };

    fetchUsersIFollow();
  }, []);

  return (
    <div className="profile-container">
      <div className="title-image-container">
        <h1 className="profile-tittle">
          {t("profileTitle")} {auth.name}
        </h1>

        <div className="container-file-image">
          <div>
            {auth.image !== "default.png" ? (
              <img
                src={globalConfiguration.url + "user/avatar/" + auth.image}
                alt="avatarImage"
                className="profile-image"
              />
            ) : (
              <img src={Avatar} alt="avatarImage" className="profile-image" />
            )}
            <div className="container-input">
              <input
                type="file"
                id="avatarFileInput"
                onChange={handleFileChange}
                className="form-control-file"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="userProfile-container">
        <div className="userProfile-back">
          <div className="profile-container">
            <div className="card-body">
              <h3 className="card-tittle">{t("personalInfo")}</h3>
              <p className="card-p">
                <strong>{t("name")}</strong> {auth.name}
              </p>
              <input
                type="text"
                placeholder={t("placeHolderEditName")}
                className="form-control-profile"
                onChange={(e) => setName(e.target.value)}
              />
              <p className="font-weight-normal">
                <strong>{t("nick")}</strong> {auth.nick}
              </p>
              <p className="font-weight-normal">
                <strong>{t("bio")} </strong>
                {auth.bio}
              </p>
              <textarea
                rows="3"
                placeholder={t("placeHolderEditBio")}
                className="form-control-profile"
                maxLength={45}
                onChange={(e) => setBio(e.target.value)}
              >
                {bio}
              </textarea>
              <p className="font-weight-normal">
                <strong>{t("email")}</strong> {auth.email}
              </p>
              <p className="font-weight-normal">
                <strong>{t("date")}</strong> {dateFormat}
              </p>
              <div className="mb-3">
                {userChanged === "false" && (
                  <strong className="alert alert-danger form-control">
                    {t("errorFormChanges")}
                  </strong>
                )}
                {userChanged === "true" && (
                  <strong className="alert alert-success form-control">
                    {t("changesSuccess")}
                  </strong>
                )}
                {userChanged === "errorBlankSpacesProfile" && (
                  <strong className="alert alert-danger form-control">
                    {t("errorBlankSpacesProfile")}
                  </strong>
                )}
              </div>
              <button className="btn-principal" onClick={saveFormChanges}>
                {t("saveChangesButton")}
              </button>
              <div className="mb-3">
                {newPass === true ? (
                  <div className="alert alert-success mt-3">
                    {t("changePasswordSuccess")}
                  </div>
                ) : (
                  ""
                )}
                {newPass === false ? (
                  <div className="alert alert-danger mt-3">
                    {t("errorChangingPassword")}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h3 className="card-tittle">{t("changePassword")}</h3>
              <div className="password-profile">
                <input
                  type="password"
                  placeholder={t("placeHolderCurrentPassword")}
                  className="form-control-profile"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder={t("placeHolderNewPassword")}
                  className="form-control-profile"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="btn-principal mb-3" onClick={changePassword}>
                  {t("buttonChangePassword")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="following-container">
  <h3 className="card-tittle">{t("followingList")}</h3>
  {following.length === 0 ? (
    <p>{t("emptyFollowingList")}</p>
  ) : (
    <div className="following-list"> {/* Contenedor para todos los usuarios seguidos */}
      {following.map((followedUser) => (
        <div key={followedUser._id} className="card-body"> {/* Cada usuario seguido */}
          <img
            src={
              followedUser.followed.image !== "default.png"
                ? globalConfiguration.url + "user/avatar/" + followedUser.followed.image
                : Avatar
            }
            alt="avatarImage"
            className="avatar-image-following"
          />
          <h5 className="card-title">{followedUser.followed.nick}</h5>
        </div>
      ))}
    </div>
  )}
</div>


      </div>
    </div>
  );
};

export default Profile;
