const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
var Schema = mongoose.Schema;

const utilisateurSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  motDePasse : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['client', 'restaurant', 'e-kaly', 'livreur'],
    default: "client"
  },
  status: {
    type: String,
    enum: ['pending', 'active'],
    default: 'pending'
  },
  confirmationCode: {
    type: String,
    // unique: true
  },
  restaurant_id: {
    type: Schema.Types.ObjectId, ref: 'Restaurant'
  }
}
);

utilisateurSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Utilisateur", utilisateurSchema)
