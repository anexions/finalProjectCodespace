//SCHEME FOR PUBLICATIONS-------------------------------------

const { Schema, model } = require("mongoose"); //export to use it in the follow controllers

const publicatonSchema = Schema({
  //USER WHO CREATE THE PUBLICATION
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Publication", publicatonSchema, "publications");
//name, scheme, name of collection to save in bbdd(optional)
