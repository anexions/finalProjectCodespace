//JWT service is for create and decode tokens, this file must to be import in user.js controller

//IMPORT DEPENDENCIES---------------------------------
const jwt = require("jwt-simple");
const moment = require("moment");

//Get secret key to make token more segure (write whatever you want)
const secretKey = "SECRET_KEY_RELATIA_2023_!@#$%^&*()_+";

//FUNCTION TO CREATE A TOKEN---------------------------

const createToken = (user) => {
  const payload = {
    id: user._id,
    surname: user.surname,
    name: user.name,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(), //iat = date of creation, unix is a format (a lot of caracteres)
    exp: moment().add(30, "days").unix(), //exp = expiration date of the token
  };

  //return decode token
  return jwt.encode(payload, secretKey); //encode the payload with the secret key
};

//EXPORT MODULE----------------------------------------
module.exports = {
  createToken,
  secretKey,
};
