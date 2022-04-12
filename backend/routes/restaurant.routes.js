const express = require("express")

const restaurantController = require("../controllers/restaurant.controller")
const authorize = require('../middleware/check-auth')
const type = require("../configs/type.config");
const router = express.Router();

router.get("/liste", /*authorize(type.client), */restaurantController.listeRestaurant)
router.get("/recherche/:cle", /*authorize(type.client), */restaurantController.rechercheRestaurant)

module.exports = router;
