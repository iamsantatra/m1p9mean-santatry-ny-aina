import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../panier/item.entity';
import { Commande } from './commande.model';

const BACKEND_URL = /*environment.apiUrl + */"commande";
@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  private commandes: Commande[] = [];
  private commandesUpdated = new Subject<Commande[]>();

  constructor(private http: HttpClient) {}


  ajout(commandesData: Commande) {

    // let commandesData: Commande[] = [];
    // for(let i = 0; i < items.length; i++) {
    //   let commande: Commande = {
    //     plat_id : items[i].plat.id,
    //     quantite : items[i].quantite,
    //     lieu : lieu,
    //     typeLivraison : typeLivraison,
    //     dateLivraison : dateLivraison,
    //     etat: 0,
    //     prixLivraison: prixLivraison
    //   }
    //   commandesData.push(commande);
    // }
    // console.log(commandesData)
    return this.http
      .post<{message: string, data: Commande}>(BACKEND_URL + "/commandePlat", commandesData)
  }
}
