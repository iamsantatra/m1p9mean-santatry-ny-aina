export interface Utilisateur {
  id?: string;
  nom: string;
  email: string;
  motDePasse: string;
  type?: string;
  status?: string;
  confirmationCode?: string;
  restaurant_id?: string;
}
