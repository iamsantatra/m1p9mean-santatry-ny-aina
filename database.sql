use e-kaly;
db.restaurants.insertMany(
	[
		{
			_id: 1,
			nom: "Restaurant Duo",
			image: "assets/images/restaurants/restaurant-duo.jpg",
			lieu: "Ampasamadinika"
		},
		{
			_id: 2,
			nom: "Serependity",
			image: "assets/images/restaurants/serependity.jpg",
			lieu: "Ankorondrano"
		},
		{
			_id: 3,
			nom: "Kibota",
			image: "assets/images/restaurants/kibota.jpg",
			lieu: "Isotry"
		}
	]
)
