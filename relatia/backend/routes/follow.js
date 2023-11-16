//IMPORTS--------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");

//Dont forget to import auth middleware to check if the token is valid
const auth = require("../middlewares/auth");

//ROUTES---------------------------------------------------------------------
router.get("/prueba-follow", followController.testFollow);
//Save follow
router.post("/save", auth.auth, followController.saveFollow);
//Unfollow user
router.delete("/unfollow/:id", auth.auth, followController.deleteFollow);
//Following
router.get("/following/:id?/:page?", auth.auth, followController.following);
//Followers
router.get("/followers/:id?/:page?", auth.auth, followController.followers);

//EXPORT MODULE---------------------------------------------------------------
module.exports = router;
