const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
var Schema = mongoose.Schema;

const commandeSchema = mongoose.Schema({
  plat_id: {
    type: Schema.Types.ObjectId, ref: 'Plat',
    required: true
  },
  utilisateur_id: {
    type: Schema.Types.ObjectId, ref: 'Utilisateur',
    required: true
  },
  livreur_id: {
    type: Schema.Types.ObjectId, ref: 'Utilisateur',
  },
  etat : {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
    required: true
  },
  lieu: {
    type: String,
    required: [true, "Veuillez saisir une adresse"],
  },
  typeLivraison: {
    type: String,
    enum: ["ville", "peripherie"],
    required: [true, "Veuillez saisir une type"]
  },
  prixLivraison: {
    type: Number,
    required: [true, "Veuillez saisir le prix de livraison"]
  },
  quantite: {
    type: Number,
    required: [true, "Veuillez saisir la quantité"]
  },
  dateLivraison: {
    type: Date,
    required: [true, "Veuillez saisir la date de livraison"]
  },
}
);

commandeSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Commande", commandeSchema)
