// IMPORT DEPENDENCIES---------------------------------
const connection = require("./database/connection"); // Import the connection to the database (connection.js)
const express = require("express"); // Import express to create the server (Line 12)
const cors = require("cors"); // Import cors to allow the connection between the front and the back (Line 16)


//CONNECT TO THE DATABASE----
connection(); //Just call the function

//NODE SERVER----WITH EXPRESS---------------------------
const app = express();
const port = 3500;

//CONFIGURE CORS----------------------------------------
app.use(cors()); //Here, we are allowing the connection between the front and the back

//CONVERT INFO FROM BODY TO JSON------------------------
app.use(express.json()); //Body to JSON
app.use(express.urlencoded({ extended: true })); //Url to JSON
app.use('/user/avatar', express.static('./uploads/avatars'));


//CONFIGURE ROUTES-------------------------------------
const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publication");
const followRoutes = require("./routes/follow");

//CHARGE ROUTES (To express)-----------------------------
app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/follow", followRoutes);

//START SERVER------------------------------------------
app.listen(port, () => {
  console.log(`Node server running at port: ${port}`);
});
