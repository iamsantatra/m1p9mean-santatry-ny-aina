const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Utilisateur = require("../models/utilisateur.model")
const nodemailer = require("../configs/nodemailer.config");

exports.inscription = (req, res, next) => {
  bcrypt.hash(req.body.motDePasse, 10)
    .then(hash => {
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
      utilisateur.save()
        .then(result => {
          res.status(201).json({
            message: "L'utilisateur a été enregistré avec succès ! Merci de consulter vos emails",
            data: result
          });
          nodemailer.sendConfirmationEmail(
            utilisateur.nom,
            utilisateur.email,
            utilisateur.confirmationCode
          );
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
};

exports.connexion = (req, res, next) => {
  let fetchedUser;
  Utilisateur.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email inexistant"
        });
      }

      fetchedUser = user;
      return bcrypt.compare(req.body.motDePasse, user.motDePasse);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Connexion échouée"
        });
      }
      if (fetchedUser.status != "active") {
        return res.status(401).send({
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
    .catch(err => {
      return res.status(401).json({
        message: "Connexion échouée"
      });
    });
};

exports.verification = (req, res, next) => {
  Utilisateur.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur inexistant" });
      }

      user.status = "active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};

