const express = require("express")

const restaurantController = require("../controllers/restaurant.controller")
const authorize = require('../middleware/check-auth')
const type = require("../configs/type.config");
const router = express.Router();
const extractFile = require("../middleware/upload");

router.get("/liste", /*authorize(type.client), */ restaurantController.listeRestaurant)
router.get("/recherche/:cle", /*authorize(type.client), */restaurantController.rechercheRestaurant)
router.post("/ajout", authorize(type.admin), extractFile, restaurantController.ajout)
router.delete("/supprimer/:id", authorize(type.admin), extractFile, restaurantController.supprimer)
module.exports = router;
