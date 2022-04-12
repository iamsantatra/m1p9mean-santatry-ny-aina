const express = require("express")

const utilisateurController = require("../controllers/utilisateur.controller")
const authorize = require('../middleware/check-auth')
const router = express.Router();
const type = require("../configs/type.config");

router.post("/inscription", utilisateurController.inscription)
router.post("/connexion", utilisateurController.connexion)
router.get("/confirmation/:confirmationCode", utilisateurController.verification)
router.get("/listeLivreur/", utilisateurController.listeLivreur)
router.post("/ajout", authorize([type.admin]), utilisateurController.ajout)
router.delete("/supprimer/:id", authorize([type.admin]), utilisateurController.supprimer)
router.put("/update/:id", authorize([type.admin]), utilisateurController.update)
// router.get("/verificaton/", utilisateurController.listeLivreur)

module.exports = router;
