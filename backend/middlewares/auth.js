//MIDDLEWARE OF AUTHENTICATION---------------------(I put the same name auth sorry) auth.auth
const jwt = require("jwt-simple");
const moment = require("moment");

//IMPORT SECRET KEY---------------------------------

const libraryjwt = require("../services/jwt");
const secretKey = libraryjwt.secretKey;

// MIDDLEWARE FUNCTION------------------------------
//We need to put this on the routes we want to protect.

exports.auth = (req, res, next) => {
  //Check if the head token is valid
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "The request dont have the header authorization",
    });
  }
  //Decode token
  let token = req.headers.authorization.replace(/['"]+/g, ""); //replace " and ' for nothing to clean the token

  try {
    let payLoad = jwt.decode(token, secretKey);

    //Check if the token has expired
    if (payLoad.exp <= moment().unix()) {
      //if the token has expired return error
      return res.status(404).send({
        status: "error",
        message: "Token has expired",
      });
    }
    //Add user to request
    req.user = payLoad;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Token not valid",
    });
  }

  //Ejecute next function
  next();
};
