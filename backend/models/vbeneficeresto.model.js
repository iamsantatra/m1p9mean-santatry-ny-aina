const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

const VbeneficeRestoSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  restaurant_id: Schema.Types.ObjectId,
  nom: String,
  total : Number,
});

// VbeneficeRestoSchema.plugin(uniqueValidator)
module.exports = mongoose.model("VbeneficeResto", VbeneficeRestoSchema, "VbeneficeResto")
