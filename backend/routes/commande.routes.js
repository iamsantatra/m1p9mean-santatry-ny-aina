const express = require("express")

const commandeController = require("../controllers/commande.controller")
const authorize = require('../middleware/check-auth')
const type = require("../configs/type.config");
const router = express.Router();

router.post("/commandePlat", authorize(type.client), commandeController.commandePlat)

module.exports = router;
