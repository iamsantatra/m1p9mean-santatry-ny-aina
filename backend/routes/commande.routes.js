const express = require("express")

const commandeController = require("../controllers/commande.controller")
const authorize = require('../middleware/check-auth')
const type = require("../configs/type.config");
const router = express.Router();

router.post("/commandePlat", authorize(type.client), commandeController.commandePlat)
router.put("/updateCommande", authorize([type.admin, type.restaurant, type.livreur]), commandeController.updateCommande)
router.get("/listeCommande", authorize([type.admin, type.restaurant, type.livreur]), commandeController.listeCommande)
router.get("/recherche/:etat", authorize([type.admin]), commandeController.rechercheCommande)
router.delete("/deleteCommande/:id", authorize([type.admin, type.restaurant]), commandeController.deleteCommande)
router.get("/beneficeResto", authorize([type.admin, type.restaurant]), commandeController.beneficeResto)

module.exports = router;
