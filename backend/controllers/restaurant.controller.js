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

exports.rechercheRestaurant = async (req, res, next) => {
  try {
    // let regex = new RegExp(["^", req.body.cle$, "$"].join(""), "i");
    const test = req.params.cle || '';
    console.log(typeof test)
    let listeRestaurant = await Restaurant.find({
      "$or": [
        {nom:{$regex: new RegExp(req.params.cle,"i")}},
        {lieu:{$regex: new RegExp(req.params.cle,"i")}}
      ]
    });
    if(test === "undefined") {
      // console.log("ato")
      listeRestaurant = await Restaurant.find({})
    }
    return res.status(200).json({
      message: "Liste des restaurants avec recherche",
      data: listeRestaurant
    });
  } catch(err) {
    console.log(err)
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};
