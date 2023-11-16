import loginImage from "../assets/img/login.png";
import loginImage02 from "../assets/img/login02.png";

//Creo un array con las imágenes que quiero mostrar
const images = [loginImage, loginImage02];

//Función que devuelve una imagen aleatoria
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length); //Get a random number between 0 and the length of the array of images
  return images[randomIndex]; //Return one number of the array (every number is an image)
};

//Export the function
export default getRandomImage;
