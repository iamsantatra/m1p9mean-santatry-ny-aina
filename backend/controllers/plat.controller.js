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

exports.recherchePlat = async (req, res, next) => {
  try {
    // let regex = new RegExp(["^", req.body.cle$, "$"].join(""), "i");
    let restaurantInfo = await Restaurant.findOne({
      _id: ObjectID(req.params.restaurant_id)
    })
    if(restaurantInfo == null) {
      return res.status(404).json({
        message: "Restaurant inexistant"
      });
    }
    let listePlat = await Plat.find({
      "$and": [
      {
        "$or": [
          {nomPlat:{$regex: new RegExp(req.params.cle,"i")}},
          {description:{$regex: new RegExp(req.params.cle,"i")}},
          {categorie:{$regex: new RegExp(req.params.cle,"i")}},
        ]
      },
      {
        "restaurant_id": req.params.restaurant_id
      }
      ]
    });
    return res.status(200).json({
      message: "Liste des plats avec recherche",
      data: listePlat
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

    let restaurantInfo = await Restaurant.findOne({
      _id: ObjectID(req.body.restaurant_id)
    })
    if(restaurantInfo == null) {
      return res.status(404).json({
        message: "Restaurant inexistant"
      });
    }

    let platInfo = await Plat.findOne({
      restaurant_id: ObjectID(req.body.restaurant_id),
      nomPlat: req.body.nomPlat
    })
    if(platInfo != null) {
      return res.status(403).json({
        message: "Nom repas "+ req.body.nomPlat +" existant"
      });
    }

    console.log(req.file)
    plat = new Plat({
      nomPlat: req.body.nomPlat,
      description: req.body.description,
      categorie: req.body.categorie,
      prixAchat: req.body.prixAchat,
      prixVente: req.body.prixVente,
      etat: 1,
      restaurant_id: ObjectID(req.body.restaurant_id)
    })
    if(req.file != undefined) {
      console.log("misy")
      plat = new Plat({
        nomPlat: req.body.nomPlat,
        description: req.body.description,
        categorie: req.body.categorie,
        prixAchat: req.body.prixAchat,
        prixVente: req.body.prixVente,
        etat: 1,
        image:  "assets/images/" + req.file.filename,
        restaurant_id: ObjectID(req.body.restaurant_id)
      })
    }
    console.log(plat)

    let result = await plat.save()

    return res.status(201).json({
      message: req.body.nomPlat + " ajouté",
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
        message: "Ajout plat non valide"
      })
    }
}

exports.supprimer = async (req, res, next) => {
  if(req.params.id == undefined) {
    return res.status(403).json({ message: "Veuillez indiqué le plat" });
  }
  try {
    let id =  ObjectID(req.params.id);
    let plat = await Plat.deleteOne({ "_id" : id})

    if(plat == undefined) {
      console.log("Tsy misy plat")
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

exports.update = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Veuillez remplir les données"
    });
  }
  try {
  const testId = ObjectID(req.params.id);
    console.log(testId)
    let platInfo = await Plat.findOne({
      restaurant_id: ObjectID(req.body.restaurant_id),
      nomPlat:   req.body.nomPlat,
      _id: { "$ne": ObjectID((req.params.id)) }
    })
    console.log("test", platInfo)
    if(platInfo != null) {
      return res.status(403).json({
        message: "Nom repas "+ req.body.nomPlat +" existant"
      });
    }
    plat = {
      nomPlat: req.body.nomPlat,
      description: req.body.description,
      categorie: req.body.categorie,
      prixAchat: req.body.prixAchat,
      prixVente: req.body.prixVente,
      etat: req.body.etat
    }
    console.log("fichier", req.file)
    if(req.file != undefined) {
      plat = {
        nomPlat: req.body.nomPlat,
        description: req.body.description,
        categorie: req.body.categorie,
        prixAchat: req.body.prixAchat,
        prixVente: req.body.prixVente,
        etat: req.body.etat,
        image:  "assets/images/" + req.file.filename
      }
    }
    console.log(plat)
    // console.log(id)
    let data = await Plat.findByIdAndUpdate(testId, plat, { runValidators: true })
    console.log(data)
    if (!data) {
      res.status(404).send({
        message: `Impossible de mettre à jour id=${testId}`
      });
    } else {
      res.send({
        message: "plat updated"
      });
    }
  } catch(err)  {
    console.log(err)
    res.status(500).send({
      message: "Une erreur s'est produite",
      error: err
    });
  };
}
