const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
var Schema = mongoose.Schema;

const platSchema = mongoose.Schema({

  nomPlat: {
    type: String,
    required: true
  },
  description : { // ingredient
    type: String
  },
  categorie: {
    type: String,
    required: true,
  },
  prixAchat: {
    type: Number,
    required: true
  },
  prixVente: {
    type: Number,
    required: true
  },
  etat: {
    type: Number,
    enum: [0, 1],
    default: 1
  },
  image: {
    type: String,
  },
  restaurant_id: {
    type: Schema.Types.ObjectId, ref: 'Restaurant'
  }
});

platSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Plat", platSchema)

