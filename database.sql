use e-kaly;
db.restaurants.insertMany(
	[
		{
			nom: "Restaurant Duo",
			image: "assets/images/restaurants/restaurant-duo.jpg",
			lieu: "Ampasamadinika"
		},
		{
			nom: "Serependity",
			image: "assets/images/restaurants/serependity.jpg",
			lieu: "Ankorondrano"
		},
		{
			nom: "Kibota",
			image: "assets/images/restaurants/kibota.jpg",
			lieu: "Isotry"
		}
	]
)

db.plats.insertMany(
	[
		{
			nomPlat: "Club sandwich poulet",
			description: "Poitrine de poulet désossée et sans peau (suprême) placée entre des tranches de pain ou dans un petit-pain",
			categorie: "Sandwich",
			prixAchat: 15000,
			prixVente: 20000,
			etat: 1,
			image: "assets/images/plats/restaurant-duo/sandwich-poulet.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad4")
		},
		{
			nomPlat: "Soupe van-tan",
			description: "Les wonton sont soit servis en soupe dans un bouillon clair, ou en apéritif lorsqu'ils sont frits. Ils sont garnis.",
			categorie: "Soupe",
			prixAchat: 10000,
			prixVente: 15000,
			etat: 1,
			image: "assets/images/plats/restaurant-duo/soupe-van-tan.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad4")
		},
		{
			nomPlat: "Soupe spéciale",
			description: "Soupe spéciale fait maison",
			categorie: "Soupe",
			prixAchat: 15000,
			prixVente: 24000,
			etat: 1,
			image: "assets/images/plats/restaurant-duo/soupe-speciale.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad4")
		},
		{
			nomPlat: "Hamburger spécial",
			description: "Hamburger spécial fait maison. Au porc, au boeuf, au dindon ou végé, on voudra tous les essayer, pour faire durer le plaisir tout l'été!",
			categorie: "Hamburger",
			prixAchat: 11000,
			prixVente: 13000,
			etat: 1,
			image: "assets/images/plats/serependity/hamburger-special.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad5")
		},
		{
			nomPlat: "Pizza gg",
			description: "Pizza entourée de saucisse et de fromage",
			categorie: "Pizza",
			prixAchat: 22000,
			prixVente: 24000,
			etat: 1,
			image: "assets/images/plats/serependity/pizza-gg.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad5")
		},
		{
			nomPlat: "Mine-sao crevette",
			description: "Nouilles sautées aux crevettes et pois gourmands",
			categorie: "Mine-sao",
			prixAchat: 9000,
			prixVente: 15000,
			etat: 1,
			image: "assets/images/plats/kibota/mine-sao-crevette.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad6")
		},
		{
			nomPlat: "Mine-sao tsa-tsiou",
			description: "Mine-sao tsa-tsiou fait maison",
			categorie: "Mine-sao",
			prixAchat: 8000,
			prixVente: 12000,
			etat: 1,
			image: "assets/images/plats/kibota/mine-sao-tsa-tsiou.jpg",
			restaurant_id: ObjectId("62533c9720686ab247993ad6")
		}
	]
)


db.utilisateurs.insertMany(
	[
		{
			nom: "Restaurant duo",
			motDePasse: "$2b$10$rfCEvo8nYI2rFqdgVpyzeu/mNuccmlwO8YDNvTmVDwA/.LGPHPbpm",
			email: "restaurant.duo@gmail.com",
			type: "restaurant",
			status: "active",
      restaurant_id: "624b3eb22a08b22d758a8288"
		},
		{
			nom: "Serependity",
			motDePasse: "$2b$10$rfCEvo8nYI2rFqdgVpyzeu/mNuccmlwO8YDNvTmVDwA/.LGPHPbpm",
			email: "serependity@gmail.com",
			type: "restaurant",
			status: "active",
      restaurant_id: "624b3eb22a08b22d758a8289"
		},
    {
      nom: "Kibota",
			motDePasse: "$2b$10$rfCEvo8nYI2rFqdgVpyzeu/mNuccmlwO8YDNvTmVDwA/.LGPHPbpm",
			email: "kibota@gmail.com",
			type: "restaurant",
			status: "active",
      restaurant_id: "624b3eb22a08b22d758a828a"
		},
		{
			nom: "E-kaly",
			motDePasse: "$2b$10$rfCEvo8nYI2rFqdgVpyzeu/mNuccmlwO8YDNvTmVDwA/.LGPHPbpm",
			email: "e.kaly@gmail.com",
			type: "e-kaly",
			status: "active"
		},
		{
			nom: "Livreur 1",
			motDePasse: "$2b$10$rfCEvo8nYI2rFqdgVpyzeu/mNuccmlwO8YDNvTmVDwA/.LGPHPbpm",
			email: "livreur1@gmail.com",
			type: "livreur",
			status: "active"
		},
		{
      nom: "Livreur 2",
			motDePasse: "$2b$10$rfCEvo8nYI2rFqdgVpyzeu/mNuccmlwO8YDNvTmVDwA/.LGPHPbpm",
			email: "livreur2@gmail.com",
			type: "livreur",
			status: "active"
		}
	]
)

// -- db.commandes.aggregate([
// --   {
// --     $lookup: {
// --       from: "plats",
// --       localField: "plat_id",
// --       foreignField: "_id",
// --       as: "commandePlat"
// --     }
// --   },
// --   {
// --     $lookup: {
// --       from: "restaurants",
// --       localField: "commandePlat.restaurant_id",
// --       foreignField: "_id",
// --       as: "restaurantCommande"
// --     }
// --   },
// --   {
// --     $project: {
// --         "_id":0,
// --         "commandePlat._id":0,
// --         "restaurantCommande._id":0
// --     }
// --   }
// -- ]).toArray()


db.createView('VCommande','commandes', [
  {
    $lookup: {
      from: "plats",
      localField: "plat_id",
      foreignField: "_id",
      as: "commandePlat"
    },
  },
  {
    $lookup: {
      from: "restaurants",
      localField: "commandePlat.restaurant_id",
      foreignField: "_id",
      as: "commandeRestaurant"
    }
  }
])
