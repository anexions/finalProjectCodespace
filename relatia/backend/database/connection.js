//IMPORT LIBRARIES---
const mongoose = require("mongoose"); // Import mongoose to connect to the database. With mongoose we can use methods to work with the database.

//CREATE CONNECTION TO THE DATABASE---IT IS AN ASYNC FUNCTION BECAUSE WE NEED TO WAIT FOR THE CONNECTION TO BE ESTABLISHED

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/baseDatosProyectoFinal"); //using connect method to connect to the database (need string + param)
    console.log("Connected to the database Proyecto Final"); // If the connection is successful, show this message
  } catch (error) {
    console.log(error);
    throw new Error("Can not connect to the database!"); // Stop the app if there is an error
  }
};

//EXPORT THE CONNECTION TO THE DATABASE---
module.exports = connection; // Must to be import in the index.js file
