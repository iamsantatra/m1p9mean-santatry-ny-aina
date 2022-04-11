const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;
const Plat = require("../models/plat.model")
const Restaurant = require("../models/restaurant.model")
const Utilisateur = require("../models/utilisateur.model")

const vCommandeSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  plat_id: Schema.Types.ObjectId,
  utilisateur_id: Schema.Types.ObjectId,
  etat : Number,
  lieu: String,
  typeLivraison: String,
  prixLivraison: Number,
  quantite: Number,
  dateLivraison: Date,
  livreur_id: Schema.Types.ObjectId,
  commandePlat: [Plat.schema],
  commandeRestaurant: [Restaurant.schema],
  commandeUtilisateur: [Utilisateur.schema]
});

vCommandeSchema.plugin(uniqueValidator)
module.exports = mongoose.model("VCommande", vCommandeSchema, "VCommande")
