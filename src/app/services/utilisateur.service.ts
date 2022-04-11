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
}
