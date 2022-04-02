const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const restaurantSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  },
  image : {
    type: String
  },
  lieu: {
    type: String,
    required: true,
  }
});

restaurantSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Restaurant", restaurantSchema)
