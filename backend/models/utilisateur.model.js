const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const utilisateurSchema = mongoose.Schema({
  nom: { type: String, required: true},
  motDePasse : { type: String, minLength: 8, required: true},
  email: { type: String, required: true, unique: true},
  type: { type: String, required: true, enum: ['client', 'restaurant', 'e-kaly', 'livreur'], default: "client"}
},
{ timestamps: true }
);

utilisateurSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Utilisateur", utilisateurSchema)
