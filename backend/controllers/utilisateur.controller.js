const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Utilisateur = require("../models/utilisateur.model")
const nodemailer = require("../configs/nodemailer.config");
const ObjectID = require('mongodb').ObjectID

exports.inscription = async (req, res, next) => {
  let hash = await bcrypt.hash(req.body.motDePasse, 10)
    try {
      let userTest = await Utilisateur.findOne({ "email" : req.body.email})
      if(userTest != undefined) {
        return res.status(403).json({
          message: "Email déjà enregistré",
          // data: result
        });
      }
      const token = jwt.sign(
        { email: req.body.email },
        "token_activation"
      );
      const utilisateur = new Utilisateur({
        nom: req.body.nom,
        motDePasse: hash,
        email: req.body.email,
        type: req.body.type,
        confirmationCode: token
      })
      let result = await utilisateur.save()

      nodemailer.sendConfirmationEmail(
        utilisateur.nom,
        utilisateur.email,
        utilisateur.confirmationCode
      );
      return res.status(201).json({
        message: "L'utilisateur a été enregistré avec succès ! Merci de vouloir consulter vos emails",
        data: result
      });
    } catch(err) {
        console.log(err)
        return res.status(500).json({
          message: "Inscription non valide"
        })
      }
}

exports.connexion = async (req, res, next) => {
  let fetchedUser;
  let user = await Utilisateur.findOne({ email: req.body.email })
  // console.log(user)
    try {
      if (!user) {
        return res.status(401).json({
          message: "Email inexistant"
        });
      }
      fetchedUser = user;
      bcrypt.compare(req.body.motDePasse, user.motDePasse)
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Mot de passe incorrect"
          });
        }
        if (fetchedUser.status != "active") {
          return res.status(401).json({
            message: "Compte en attente de validation",
          });
        }
        console.log(fetchedUser)
        const token = jwt.sign(
          { userId: fetchedUser._id, type: fetchedUser.type, restaurant_id: fetchedUser.restaurant_id },
          "secret_this_should_be_longer",
          { expiresIn: "24h" }
        );
        // console.log(fetchedUser.restaurant_id)
        res.status(200).json({
          token: token,
          data: fetchedUser,
          expiresIn: 86400
        });
      })
    } catch(err) {
      return res.status(401).json({
        message: "Connexion échouée"
      });
    };
};

exports.verification =  async (req, res, next) => {
  const filter = { confirmationCode: req.params.confirmationCode }
  console.log("verification")
  let user = Utilisateur.findOne({
    filter
  })
  try {
    if (!user) {
      return res.status(404).json({ message: "Utilisateur inexistant" });
    }
    const update = { status: "active" };
    Utilisateur.findOneAndUpdate(filter, update).catch((err) => {
        return res.status(500).json({ message: err });
      }
    );
    // user.save((err) => {
    //   if (err) {
    //     return res.status(500).json({ message: err });
    //   }
    // });
  } catch(e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}

exports.listeLivreur = async (req, res, next) => {
  try {
    let listeLivreur = await Utilisateur.find({
      type: "livreur"
    });
    return res.status(200).json({
      message: "Liste des livreurs",
      data: listeLivreur
    });
  } catch(err) {
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};

exports.ajout = async (req, res, next) => {
  let hash = await bcrypt.hash(req.body.motDePasse, 10)
    try {
      let userTest = await Utilisateur.findOne({ "email" : req.body.email})
      if(userTest != undefined) {
        return res.status(403).json({
          message: "Email déjà enregistré"
          // data: result
        });
      }
      const token = jwt.sign(
        { email: req.body.email },
        "token_activation"
      );
      const utilisateur = new Utilisateur({
        nom: req.body.nom,
        motDePasse: hash,
        email: req.body.email,
        type: req.body.type
      })
      let result = await utilisateur.save()

      return res.status(201).json({
        message: req.body.type + " inscrit",
        data: result
      });
    } catch(err) {
        console.log(err)
        return res.status(500).json({
          message: "Inscription non valide"
        })
      }
}

exports.supprimer = async (req, res, next) => {
  if(req.params.id == undefined) {
    return res.status(403).json({ message: "Veuillez indiqué la commande" });
  }
  try {
    let id =  ObjectID(req.params.id);
    let userTest = await Utilisateur.deleteOne({ "_id" : id})

    if(userTest == undefined) {
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

exports.update = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Veuillez remplir les données"
    });
  }
  const testId = ObjectID(req.params.id);
  try {
    console.log(testId)

    console.log(req.body.motDePasse)
    if(req.body.motDePasse == undefined) {
      console.log("tsy misy")
      utilisateur = {
        nom: req.body.nom,
        email: req.body.email,
        type: req.body.type,
        status: "active"
      }
    } else {
      let hash = await bcrypt.hash(req.body.motDePasse, 10)
      utilisateur = {
        nom: req.body.nom,
        motDePasse: hash,
        email: req.body.email,
        type: req.body.type,
        status: "active"
      }
    }
    console.log(utilisateur)
    // console.log(id)
    let data = await Utilisateur.findByIdAndUpdate(testId, utilisateur)
    console.log(data)
    if (!data) {
      res.status(404).send({
        message: `Impossible de mettre à jour id=${testId}`
      });
    } else {
      res.send({
        message: "Tutorial was updated successfully."
      });
    }
  } catch(err)  {
    console.log(err)
    res.status(500).send({
      message: `Une erreur s'est produite id=${testId}`
    });
  };
}

exports.liste = async (req, res, next) => {
  try {
    let liste = await Utilisateur.find({
      type: req.params.type
    });
    return res.status(200).json({
      message: "Liste des "+type,
      data: liste
    });
  } catch(err) {
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};
