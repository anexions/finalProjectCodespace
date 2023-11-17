//SCHEME OF FOLLOW MODEL---------------------
const { Schema, model } = require("mongoose"); //Export to use it in the follow controllers

const emailSchema = Schema({
  email: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  message: { type: String, required: true },
});

module.exports = model("Email", emailSchema, "emails");
//name, scheme, name of collection to save in bbdd(optional)
