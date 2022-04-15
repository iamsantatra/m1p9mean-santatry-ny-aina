const Restaurant = require("../models/restaurant.model")
const ObjectID = require('mongodb').ObjectID
const cloudinary = require("../configs/cloudinary.config");
const fs =  require('fs');


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

exports.ajout = async (req, res, next) => {
  try {
    let restoTest = await Restaurant.findOne({ "nom" : req.body.nom})

    if(restoTest != undefined) {
      return res.status(403).json({
        message: "Restaurant déjà enregistré"
        // data: result
      });
    }
    console.log(req.file)

    let restaurant = new Restaurant({
      nom: req.body.nom,
      // image:  "assets/images/" + req.file.filename,
      lieu: req.body.lieu
    })
    if(req.file != undefined) {
      console.log("misy")

      const uploader = async(path) => await cloudinary.uploads(path, 'Images');


      const file = req.file;
      console.log(req.file)


        const { path } = file;
        const newPath = await uploader(path)
        const url = newPath
        fs.unlinkSync(path)

      // return res.status(200).json({
      //   message: 'images uploady',
      //   data: urls
      // })
      console.log(url)
      restaurant = new Restaurant({
        nom: req.body.nom,
        image: url.url,
        lieu: req.body.lieu
      })
    }

    let result = await restaurant.save()

    return res.status(201).json({
      message: req.body.nom + " inscrit",
      data: result
    });
  } catch(err) {
      console.log(err)
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "La taille du fichier ne peut pas dépasser 2 Mo!",
        });
      }
      return res.status(500).json({
        message: "Ajout restautant non valide"
      })
    }
}

exports.supprimer = async (req, res, next) => {
  if(req.params.id == undefined) {
    return res.status(403).json({ message: "Veuillez indiqué le restaurant" });
  }
  try {
    let id =  ObjectID(req.params.id);
    let resto = await Restaurant.deleteOne({ "_id" : id})

    if(resto == undefined) {
      console.log("Tsy misy user")
      return res.status(401).json({ message: "Acces non autorisé" });
    }
    return res.status(200).json({
      message: req.params.id + " supprimé"
    });
  } catch(err) {
      console.log(err)
      return res.status(500).json({
        message: "Suppression non possible"
      })
    }
}
