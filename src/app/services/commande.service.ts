import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.entity';
import { Commande } from '../models/commande.model';
import { Plat } from '../models/plat.model';
import { Restaurant } from '../models/restaurant.model';
import { VCommande } from '../models/vcommande.model';
import { Utilisateur } from '../models/utilisateur.model';

const BACKEND_URL = environment.apiUrl + "commande";
@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  private commandes: VCommande[] = [];
  private commandesUpdated = new Subject<VCommande[]>();

  constructor(private http: HttpClient) {}


  ajout(commandesData: Commande) {
    return this.http
      .post<{message: string, data: Commande}>(BACKEND_URL + "/commandePlat", commandesData)
  }

  getCommande() {
    console.log(BACKEND_URL + "/listeCommande");
    this.http
      .get<{ message: string; data: any }>(
        BACKEND_URL + "/listeCommande"
      )
      .pipe(map((vCommandeData) => {

        return vCommandeData.data.map((vCommande: any) => {
          console.log(vCommande)
          let d: Date = new Date(vCommande.dateLivraison)
          d.setHours(d.getHours() - 3)
          let commande: Commande = {
            id: vCommande._id,
            plat_id: vCommande.plat_id,
            utilisateur_id: vCommande.utilisateur_id,
            etat: vCommande.etat,
            lieu: vCommande.lieu,
            typeLivraison: vCommande.typeLivraison,
            prixLivraison: vCommande.prixLivraison,
            quantite: vCommande.quantite,
            dateLivraison: d.toString()
          }
          let plat: Plat = {
            id: vCommande.commandePlat[0]._id,
            nomPlat: vCommande.commandePlat[0].nomPlat,
            description: vCommande.commandePlat[0].description,
            categorie: vCommande.commandePlat[0].categorie,
            prixVente: vCommande.commandePlat[0].prixVente,
            prixAchat: vCommande.commandePlat[0].prixAchat,
            etat: vCommande.commandePlat[0].etat,
            image: vCommande.commandePlat[0].image,
            restaurant_id: vCommande.commandePlat[0].restaurant_id,
          }
          // console.log(vCommande.commandePlat[0])

          let restaurant: Restaurant = {
            id: vCommande.commandeRestaurant[0]._id,
            nom: vCommande.commandeRestaurant[0].nom,
            image: vCommande.commandeRestaurant[0].image,
            lieu: vCommande.commandeRestaurant[0].lieu
          }

          let utilisateur: Utilisateur = {
            id: vCommande.commandeUtilisateur[0]._id,
            nom: vCommande.commandeUtilisateur[0].nom,
            email: vCommande.commandeUtilisateur[0].email,
            motDePasse: vCommande.commandeUtilisateur[0].motDePasse,
            type: vCommande.commandeUtilisateur[0].type,
            status: vCommande.commandeUtilisateur[0].status,
            confirmationCode: vCommande.commandeUtilisateur[0].confirmationCode
          }

          return {
            commande: commande,
            plat: plat,
            restaurant: restaurant,
            utilisateur: utilisateur
          };
        });
      }))
      .subscribe(transformedComs => {
        this.commandes = transformedComs;
        this.commandesUpdated.next([...this.commandes]);
      });
  }

  getCommandeUpdateListener() {
    return this.commandesUpdated.asObservable();
  }

  commander(id: string | null | undefined, livreur_id: string) {
    const validation: any = { id: id, livreur_id: livreur_id };
    return this.http
      .put<{message: string}>(BACKEND_URL + "/updateCommande", validation)
  }

  annuler(idAzo: string) {
    console.log(idAzo)
    return this.http
      .delete<{message: string}>(BACKEND_URL + "/deleteCommande/" +idAzo)
  }
}
