import Avatar from "../assets/img/user.png";
import useAuth from "../hooks/useAuth";
import { globalConfiguration } from "../helpers/globalConfiguration";

//Helper creado para mostrar la imagen del usuario

export const UserImage = () => {
  const { auth } = useAuth(); //Recogemos los datos del usuario (auth) del hook useAuth
  let userImage = globalConfiguration.url + "user/avatar/" + auth.image; //Creamos la ruta de la imagen del usuario
  //En el return basicamente digo que si el usuario no tiene imagen, muestre la imagen por defecto, y si tiene imagen, muestre la suya
  return (
    <div>
      {auth.image !== "default.png" ? (
        <img src={userImage} alt="avatarImage" className="avatar-image-feed" />
      ) : (
        <img src={Avatar} alt="avatarImage" className="avatar-image-feed"/>
      )}
    </div>
  );
};

export default UserImage;
