import { Commande } from "./commande.model";
import { Plat } from "./plat.model";
import { Restaurant } from "./restaurant.model";
import { Utilisateur } from "./utilisateur.model";

export interface VCommande {
  commande: Commande;
  plat: Plat;
  restaurant: Restaurant;
  utilisateur: Utilisateur;
}
