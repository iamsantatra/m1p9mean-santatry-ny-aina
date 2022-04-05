const Restaurant = require("../models/restaurant.model")

exports.listeRestaurant = async (req, res, next) => {
    try {
      let listeRestaurant = await Restaurant.find();
      return res.status(200).json({
        message: "Liste des restaurants",
        data: listeRestaurant
      });
    } catch(err) {
      return res.status(500).json({
        message: "Une erreur s'est produite",
        error: err
      });
    };
};
