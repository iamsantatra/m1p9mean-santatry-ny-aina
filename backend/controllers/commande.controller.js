const Commande = require("../models/commande.model");
const Plat = require("../models/plat.model");
const PRIX_LIVRAISON_VILLE = 7000;
const PRIX_LIVRAISON_PER = 10000;

exports.commandePlat = async (req, res, next) => {
    const plat = await Plat.findOne({
      "$and":[
      {_id: req.body.plat_id},
      {etat: 1}
    ]})
    if(plat == null) {
      return res.status(404).json({
        message: "Plat inexistant"
      });
    }

    let prixLivraisonCalcul = PRIX_LIVRAISON_PER;
    if(req.body.typeLivraison == "ville") {
      prixLivraisonCalcul = PRIX_LIVRAISON_VILLE;
    }
    const nDate = new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Nairobi'
    });
    console.log("Date zao "+nDate)
    let dateLivraison = new Date(req.body.dateLivraison).toLocaleString('fr-FR', {
      timeZone: 'Africa/Nairobi'
    });
    if(dateLivraison < nDate) {
      return res.status(403).json({
        message: "Date de livraison invalide"
      });
    }
    console.log("date de livraison "+dateLivraison);

    const commande = new Commande({
      plat_id: req.body.plat_id,
      utilisateur_id: req.body.utilisateur_id,
      etat: req.body.etat,
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
      return res.status(500).json({
        message: "Une erreur de commande s'est produite"
      });
    }
}
