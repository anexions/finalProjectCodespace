//IMPORT DEPENDENCIES---------------------------------
const express = require("express"); //To work with routes
const router = express.Router(); //To create routes
const userController = require("../controllers/user"); //Import user controller
const auth = require("../middlewares/auth"); //To check if the token is valid
const multer = require("multer"); //To upload files (avatar)

//THIS IS MULTER CONFIGURATION-------------------------
//Multer config (multer is middleware to upload files) We need to create a folder to save the files
//Require destination and filename
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/avatars/"); //null is error, if not, folder to save the files
  },
  filename(req, file, cb) {
    cb(null, "avatar-"+Date.now()+"-"+file.originalname);
  },
});

const uploads = multer({ storage }); //we pass the storage to multer

//ROUTES-----------------------------------------------

//Test
router.get("/prueba-user", auth.auth, userController.testUser); //I wrote the same name auth
//User register
router.post("/register", userController.register);
//login
router.post("/login", userController.login);
//Profile
router.get("/profile/:id", auth.auth, userController.profile); //:id is a parameter for url (need the token aswell to access)
//User list
router.get("/list/:page?", auth.auth, userController.userList); //? means optional parameter, if not, page=1
//Update user
router.put("/update/", auth.auth, userController.updateUser);
//Upload avatar
router.post(
  "/upload",
  [auth.auth, uploads.single("file0")], //if we have more than one middleware, we can pass an array of middlewares
  userController.upload
);
//Get avatar
router.get("/avatar/:file", userController.getAvatar);
//Get writers
router.get("/writers", auth.auth, userController.getWriters);



//EXPORT MODULE----------------------------------------
module.exports = router;
