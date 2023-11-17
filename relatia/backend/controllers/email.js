const email = require("../models/email"); //To use the models created on Models folder

const saveEmail = async (req, res) => { //No olvidar pasar req y res por parámetro

  const params = req.body; //Obtendremos los parametros que nos lleguen por POST
  if (!params.email || !params.message) {
    return res.status(400).json({
      status: "error",
      message: "Required data to send an email is missing.",
    });
  }
  const newEmail = new email(params); //Creamos el objeto del modelo Email

  try {
    await newEmail.save();
    return res.status(200).json({
      status: "success",
      message: "Email registered successfully",
      email: newEmail,
    });
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = saveEmail;
