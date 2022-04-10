export interface Commande {
  id?: string;
  plat_id: string;
  utilisateur_id?: string;
  livreur_id?: string;
  etat: number;
  lieu: string;
  typeLivraison: string;
  prixLivraison: number;
  quantite: number;
  dateLivraison: string;
}
