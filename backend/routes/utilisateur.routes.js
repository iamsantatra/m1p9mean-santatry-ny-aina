const express = require("express")

const utilisateurController = require("../controllers/utilisateur.controller")
const authorize = require('../middleware/check-auth')
const router = express.Router();
const type = require("../configs/type.config");

router.post("/inscription", utilisateurController.inscription)
router.post("/connexion", utilisateurController.connexion)
router.get("/confirmation/:confirmationCode", utilisateurController.verification)
router.get("/listeLivreur/", utilisateurController.listeLivreur)

module.exports = router;
