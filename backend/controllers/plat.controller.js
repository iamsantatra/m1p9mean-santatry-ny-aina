const Plat = require("../models/plat.model")
const Restaurant = require("../models/restaurant.model")
const ObjectID = require('mongodb').ObjectID

exports.listePlatRestaurant = async (req, res, next) => {

  try {
  let restaurantInfo = await Restaurant.findOne({
      _id: ObjectID(req.params.restaurant_id)
  })
  if(restaurantInfo == null) {
    return res.status(404).json({
      message: "Restaurant inexistant"
    });
  }
  let listePlatRestaurant = await Plat.find({
      restaurant_id: ObjectID(req.params.restaurant_id)
  })
    return res.status(200).json({
      message: "Liste des plats du restaurant_id "+ObjectID(req.params.restaurant_id),
      data: listePlatRestaurant
    });
  } catch(err) {
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};

exports.detailPlat = async (req, res, next) => {

  try {
    let detailPlat = await Plat.findOne({
      _id: ObjectID(req.params.plat_id)
    })

    if(detailPlat == null) {
      return res.status(404).json({
        message: "Plat inexistant"
      });
    }
    console.log(detailPlat)
    return res.status(200).json({
      message: "Plat "+ObjectID(req.params.plat_id),
      data: detailPlat
    });
  } catch(err) {
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};
