//SCHEME OF FOLLOW MODEL---------------------
const { Schema, model } = require("mongoose"); //Export to use it in the follow controllers

const followSchema = Schema({
  user: {
    type: Schema.ObjectId, //We will know wich user id doing follows.
    ref: "User",
  },
  followed: {
    type: Schema.ObjectId,
    ref: "User",
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Follow", followSchema, "follows");
//name, scheme, name of collection to save in bbdd(optional)

