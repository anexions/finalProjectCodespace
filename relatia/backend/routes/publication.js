//IMPORTS--------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publication");
const auth = require("../middlewares/auth");

//ROUTES---------------------------------------------------------------------
router.get("/prueba-publication", publicationController.testPublication);
//Guardar publicaciones
router.post("/save", auth.auth, publicationController.savePublication);
//Mostrar una publicación
router.get("/detail/:id", auth.auth, publicationController.detailPublication);
//Delete publication
router.delete("/delete/:id", auth.auth, publicationController.deletePublication);
//Edit publication
router.put("/edit/:id", auth.auth, publicationController.editPublication);
//Like publication
router.post("/like/:id", auth.auth, publicationController.likePublication);
//Unlike publication
router.post("/unlike/:id", auth.auth, publicationController.unLikePublication);
//Listar todas las publicaciones de un usuario
router.get("/userlist/:id/:page?", auth.auth, publicationController.listPublicationUser);
//Listar todas las publicaciones de los usuarios que seguimos
router.get("/feed/:page?", auth.auth, publicationController.feedInicial);

//EXPORT MODULE---------------------------------------------------------------
module.exports = router;