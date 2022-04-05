const express = require("express")

const platController = require("../controllers/plat.controller")

const router = express.Router();

router.get("/listePlatRestaurant/:restaurant_id", platController.listePlatRestaurant)

module.exports = router;
