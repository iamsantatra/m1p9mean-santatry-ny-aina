const Commande = require("../models/commande.model");
const Plat = require("../models/plat.model");
const PRIX_LIVRAISON_VILLE = 7000;
const PRIX_LIVRAISON_PER = 10000;
const ObjectID = require('mongodb').ObjectID
const VCommande = require("../models/vcommande.model")


exports.commandePlat = async (req, res, next) => {
    // console.log(req.body)
    const plat = await Plat.findOne({
      "$and":[
      {_id: req.body.plat_id},
      {etat: 1}
    ]})
    if(plat == null) {
      return res.status(404).json({
        message: "Plat inexistant ou épuisé"
      });
    }

    let prixLivraisonCalcul = PRIX_LIVRAISON_PER;
    if(req.body.typeLivraison == "ville") {
      prixLivraisonCalcul = PRIX_LIVRAISON_VILLE;
    }
    const nDate = new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Nairobi'
    });;
    console.log("Date zao "+nDate)
    console.log("Date zao "+new Date(nDate).getTime())
    let dateLivraison = new Date(req.body.dateLivraison).toLocaleString('fr-FR', {
      timeZone: 'Africa/Nairobi'
    });
    console.log("date de livraison "+dateLivraison);
    console.log("date de livraison "+new Date(req.body.dateLivraison).getTime());
    let dateL = new Date(req.body.dateLivraison)
    dateL = dateL.getDate + "/" + dateL.getMonth + "/" + dateL.getDay+", "+dateL.getTime()+":"+dateL.getMinutes+":"+dateL.getSeconds

    let dateA = new Date()
    dateA = dateA.getDate + "/" + dateA.getMonth + "/" + dateA.getDay+", "+dateA.getTime()+":"+dateA.getMinutes+":"+dateA.getSeconds
    if(dateL < dateA) {
      return res.status(403).json({
        message: "Date de livraison invalide"
      });
    }
    dateLivraison = new Date(req.body.dateLivraison)
    dateLivraison.setHours( dateLivraison.getHours() + 3);
    const commande = new Commande({
      plat_id: req.body.plat_id,
      utilisateur_id: req.userData.userId,
      etat: 0,
      lieu: req.body.lieu,
      typeLivraison: req.body.typeLivraison,
      prixLivraison: prixLivraisonCalcul,
      quantite: req.body.quantite,
      dateLivraison: dateLivraison
    });
    try {
      const newCommande =  await commande.save();
      return res.status(201).json({
        message: "Commande effectuée",
        data: newCommande
      });
    } catch(error) {
      console.log(error)
      return res.status(500).json({
        message: "Une erreur de commande s'est produite",
        error: error
      });
    }
}

exports.updateCommande = async (req, res, next) => {

  // let vCommande = await VCommande.find({ "commandePlat.etat": 1});
  // console.log(vCommande)

  try {
    if(req.body.id == undefined)
      return res.status(403).json({ message: "Veuillez indiqué la commande" });
    let id =  ObjectID(req.body.id);
    switch(req.userData.type) {
      case 'restaurant':
        avadika_etat = 1;
        messageSucces = "Commande validée par restaurant"
        etat_initial = 0
        commande = {
          "etat": avadika_etat
        };
        vCommande = await VCommande.findOne({
          "$and": [
            { "_id": id },
            { "commandePlat.restaurant_id": req.userData.restaurant_id },
            { "etat": etat_initial }
          ]
        })
        break;
      case 'e-kaly':
        if(req.body.livreur_id == undefined)
          return res.status(403).json({ message: "Veuillez saisir le livreur" });
        let livreur_id = ObjectID(req.body.livreur_id)
        let commandeLivreur = await Commande.findOne({ "livreur_id": livreur_id});
        let commandeCorrespondant = await Commande.findOne({ "_id": id});

        let dateL = new Date(commandeLivreur.dateLivraison)
        dateL = dateL.getDate + "/" + dateL.getMonth + "/" + dateL.getDay+", "+dateL.getTime()+":"+dateL.getMinutes+":"+dateL.getSeconds
        let dateC = new Date(ommandeCorrespondant.dateLivraison)
        dateC = dateC.getDate + "/" + dateC.getMonth + "/" + dateC.getDay+", "+dateC.getTime()+":"+dateC.getMinutes+":"+dateC.getSeconds
        if(dateL == dateC ) {
          // console.log("dsids")
          return res.status(403).json({ message: "Livreur non disponible" });
        }
        // console.log(commandeLivreur)
        messageSucces = "Commande validée par e-kaly"
        avadika_etat = 2
        etat_initial = 1
        commande = {
          "etat": avadika_etat,
          "livreur_id": livreur_id
        };
        vCommande = await VCommande.findOne({
          "$and": [
            { "_id": id },
            { "etat": etat_initial }
          ]
        })
        break;
      case 'livreur':
        messageSucces = "Commande livrée"
        avadika_etat = 3
        etat_initial = 2
        commande = {
          "etat": avadika_etat
        };
        vCommande = await VCommande.findOne({
          "$and": [
            { "_id": id },
            { "livreur_id": req.userData.userId },
            { "etat": etat_initial }
          ]
        })
        break;
      default:
        console.log("Tsy misy type")
        return res.status(401).json({ message: "Acces non autorisé" });
    }

    if(vCommande == undefined) {
      console.log("Tsy misy commande")
      return res.status(401).json({ message: "Acces non autorisé" });
    }


    let result = await Commande.updateOne({ _id: id, etat: etat_initial}, commande)
    // console.log(result);

    return res.status(200).json({
      message: messageSucces,
      // data: result
    });
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      message: "Une erreur s'est produite. Commande non validée",
      error: error
    });
  }
};

exports.listeCommande = async (req, res, next) => {

  try {
    switch(req.userData.type) {
      case 'restaurant':
        listeCommande = await VCommande.find({
          "$or": [
            {etat: 0},
            {etat: 1}
          ],
          "$and": [
            {"commandePlat.restaurant_id": ObjectID(req.userData.restaurant_id)}
          ]
        })
        break;
      case 'e-kaly':
        listeCommande = await VCommande.find({
          "$or": [
            {etat: 0},
            {etat: 1}
          ]
        })
        break;
      case 'livreur':
        listeCommande = await VCommande.find({
            etat: 2
        })
        break;
      default:
        console.log("Tsy misy type")
        return res.status(401).json({ message: "Acces non autorisé" });
    }

    return res.status(200).json({
      message: "Liste des commandes",
      data: listeCommande
    });
  } catch(err) {
    console.log(err)
    return res.status(500).json({
      message: "Une erreur s'est produite",
      error: err
    });
  };
};

exports.deleteCommande = async (req, res, next) => {

  try {
    if(req.params.id == undefined)
      return res.status(403).json({ message: "Veuillez indiqué la commande" });
    let id =  ObjectID(req.params.id);
    switch(req.userData.type) {
      case 'restaurant':
        vCommande = await VCommande.findOneAndDelete({
          "$and": [
            { "_id": id },
            { "etat": 0 }
          ]
        })
        break;
      case 'e-kaly':
        vCommande = await VCommande.findOneAndDelete({
          "$and": [
            { "_id": id },
            { "etat": 1 }
          ]
        })
        break;
      default:
        console.log("Tsy misy type")
        return res.status(401).json({ message: "Acces non autorisé" });
    }

    if(vCommande == undefined) {
      console.log("Tsy misy commande")
      return res.status(401).json({ message: "Acces non autorisé" });
    }

    return res.status(200).json({
      message: "Commande annulée",
      data: vCommande
    });
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      message: "Une erreur s'est produite. Commande non annulée",
      error: error
    });
  }
};
