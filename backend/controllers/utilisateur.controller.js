const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Utilisateur = require("../models/utilisateur.model")
const nodemailer = require("../configs/nodemailer.config");


exports.inscription = async (req, res, next) => {
  let hash = await bcrypt.hash(req.body.motDePasse, 10)
    try {
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
          res.status(201).json({
            message: "L'utilisateur a été enregistré avec succès ! Merci de consulter vos emails",
            data: result
          });
          nodemailer.jsonConfirmationEmail(
            utilisateur.nom,
            utilisateur.email,
            utilisateur.confirmationCode
          );
    } catch(err) {
        res.status(500).json({
          error: err
        })
      }
}

exports.connexion = async (req, res, next) => {
  let fetchedUser;
  let user = await Utilisateur.findOne({ email: req.body.email })
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
            message: "Connexion échouée"
          });
        }
        if (fetchedUser.status != "active") {
          return res.status(401).json({
            message: "Compte en attente de validation",
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "24h" }
        );
        res.status(200).json({
          token: token
        });
      })
    } catch(err) {
      return res.status(401).json({
        message: "Connexion échouée"
      });
    };
};

exports.verification = (req, res, next) => {
  Utilisateur.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur inexistant" });
      }

      user.status = "active";
      user.save((err) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};

