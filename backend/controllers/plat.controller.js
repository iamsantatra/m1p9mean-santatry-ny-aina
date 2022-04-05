const Plat = require("../models/plat.model")
const Restaurant = require("../models/restaurant.model")

exports.listePlatRestaurant = async (req, res, next) => {

  let restaurantInfo = await Restaurant.findOne({
      _id: req.params.restaurant_id
  })
  if(restaurantInfo == null) {
    return res.status(404).json({
      message: "Restaurant inexistant"
    });
  }
  let listePlatRestaurant = await Plat.find({
    "$and": [
      {restaurant_id: req.params.restaurant_id},
      {etat: 1}
    ]
  })
  try {
      return res.status(200).json({
        message: "Liste des plats du restaurant_id "+req.params.restaurant_id,
        data: listePlatRestaurant
      });
  } catch(err) {
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};
