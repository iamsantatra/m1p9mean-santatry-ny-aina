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
  etat : { // ingredient
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  lieu: {
    type: String,
    required: true,
  },
  typeLivraison: {
    type: String,
    enum: ["ville", "peripherie"]
  },
  prixLivraison: {
    type: Number,
    required: true
  },
  quantite: {
    type: Number,
    required: true
  },
  dateLivraison: {
    type: Date,
    required: true
  }
}
);

commandeSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Commande", commandeSchema)
