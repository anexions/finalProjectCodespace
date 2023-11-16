//DEFINE THE MODEL FOR USER (SAME AS BBDD SCHEME)

const { Schema, model } = require("mongoose");

//Create the scheme for user---------------------------------
const userSchema = Schema({
  name: { type: String, required: true },
  surname: String,
  bio: { type: String, default: "Amazing writer. Change your bio in your profile." },
  nick: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "role_user" },
  image: { type: String, default: "default.png" },
  created_date: { type: Date, default: Date.now },
});

//EXPORT THE MODEL TO USE ON CONTROLLER-----------------------
module.exports = model("User", userSchema, "users");
//We need the name, the scheme and "optional" the name to save collection in BBDD (if not, it will be "users" by default)
