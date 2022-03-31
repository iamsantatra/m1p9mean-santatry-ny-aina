const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Utilisateur = require("../models/utilisateur.model")

const router = express.Router();

router.post("/inscription", (req, res, next) => {
  bcrypt.hash(req.body.motDePasse, 10)
    .then(hash => {
      const utilisateur = new Utilisateur({
        nom: req.body.nom,
        motDePasse: hash,
        email: req.body.email,
        type: req.body.type
      })
      utilisateur.save()
        .then(result => {
          res.status(201).json({
            message: "Utilisateur inscrit",
            data: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
})

router.post("/connexion", (req, res, next) => {
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
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
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
});

module.exports = router;
