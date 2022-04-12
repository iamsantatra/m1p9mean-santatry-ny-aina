import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur.model';


const BACKEND_URL = environment.apiUrl + "utilisateur";
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private utilisateurs: Utilisateur[] = [];
  private utilisateursUpdated = new Subject<Utilisateur[]>();

  constructor(private http: HttpClient) {}

  getLivreur() {
    this.http
      .get<{ message: string; data: any }>(
        BACKEND_URL + "/listeLivreur"
      )
      .pipe(map((userData) => {
        return userData.data.map((utilisateur: any) => {
          return {
            id: utilisateur._id,
            nom: utilisateur.nom,
            motDePasse: utilisateur.motDePasse,
            email: utilisateur.email,
            type: utilisateur.type,
            status: utilisateur.status
          };
        });
      }))
      .subscribe(transformedUser => {
        this.utilisateurs = transformedUser;
        this.utilisateursUpdated.next([...this.utilisateurs]);
      });
  }



  getUtilisateursUpdateListener() {
    return this.utilisateursUpdated.asObservable();
  }

  ajout(nom: string, email: string, motDePasse: string, type: string) {
    // console.log("test")
    const userData: Utilisateur = {nom: nom, email: email, motDePasse: motDePasse, type: type };
    console.log(BACKEND_URL + "/ajout")
    return this.http
      .post<{message: string, data: Utilisateur}>(BACKEND_URL + "/ajout",  userData);
  }

  supprimer(userId: string | undefined) {
    console.log(BACKEND_URL + "/supprimer")
    return this.http
      .delete<{message: string}>(BACKEND_URL + "/supprimer/" + userId);
  }

  update(userId: string | null, nom: string, email: string, motDePasse: string) {
    // console.log(nom)
    const userData: Utilisateur = {nom: nom, email: email, motDePasse: motDePasse, type: "livreur"};
    return this.http
      .put<{message: string}>(BACKEND_URL + "/update/" + userId, userData);
  }
}
