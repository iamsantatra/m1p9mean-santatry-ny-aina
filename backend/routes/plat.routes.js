const express = require("express")

const platController = require("../controllers/plat.controller")
const authorize = require('../middleware/check-auth')
const type = require("../configs/type.config");
const extractFile = require("../middleware/upload");
const router = express.Router();

router.get("/listePlatRestaurant/:restaurant_id", platController.listePlatRestaurant)
router.get("/detailPlat/:plat_id", platController.detailPlat)
router.get("/recherche/:restaurant_id/:cle", platController.recherchePlat)
router.post("/ajout", authorize(type.restaurant), extractFile, platController.ajout)
router.delete("/supprimer/:id", authorize(type.restaurant) , platController.supprimer)
router.put("/update/:id", authorize(type.restaurant), extractFile, platController.update)

module.exports = router;
