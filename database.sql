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
			restaurant_id: ObjectId("624b3eb22a08b22d758a8288")
		},
		{
			nomPlat: "Soupe van-tan",
			description: "Les wonton sont soit servis en soupe dans un bouillon clair, ou en apéritif lorsqu'ils sont frits. Ils sont garnis.",
			categorie: "Soupe",
			prixAchat: 21000,
			prixVente: 25000,
			etat: 1,
			image: "assets/images/plats/restaurant-duo/soupe-van-tan.jpg",
			restaurant_id: ObjectId("624b3eb22a08b22d758a8288")
		},
		{
			nomPlat: "Soupe spéciale",
			description: "Soupe spéciale fait maison",
			categorie: "Soupe",
			prixAchat: 25000,
			prixVente: 30000,
			etat: 1,
			image: "assets/images/plats/restaurant-duo/soupe-speciale.jpg",
			restaurant_id: ObjectId("624b3eb22a08b22d758a8288")
		},
		{
			nomPlat: "Hamburger spécial",
			description: "Hamburger spécial fait maison. Au porc, au boeuf, au dindon ou végé, on voudra tous les essayer, pour faire durer le plaisir tout l'été!",
			categorie: "Hamburger",
			prixAchat: 25000,
			prixVente: 30000,
			etat: 1,
			image: "assets/images/plats/serependity/hamburger-special.jpg",
			restaurant_id: ObjectId("624b3eb22a08b22d758a8289")
		},
		{
			nomPlat: "Pizza gg",
			description: "Pizza entourée de saucisse et de fromage",
			categorie: "Pizza",
			prixAchat: 22000,
			prixVente: 28000,
			etat: 1,
			image: "assets/images/plats/serependity/pizza-gg.jpg",
			restaurant_id: ObjectId("624b3eb22a08b22d758a8289")
		},
		{
			nomPlat: "Mine-sao crevette",
			description: "Nouilles sautées aux crevettes et pois gourmands",
			categorie: "Mine-sao",
			prixAchat: 20000,
			prixVente: 23000,
			etat: 1,
			image: "assets/images/plats/kibota/mine-sao-crevette.jpg",
			restaurant_id: ObjectId("624b3eb22a08b22d758a828a")
		},
		{
			nomPlat: "Mine-sao tsa-tsiou",
			description: "Mine-sao tsa-tsiou fait maison",
			categorie: "Mine-sao",
			prixAchat: 15000,
			prixVente: 20000,
			etat: 1,
			image: "assets/images/plats/kibota/mine-sao-tsa-tsiou.jpg",
			restaurant_id: ObjectId("624b3eb22a08b22d758a828a")
		}
	]
)
