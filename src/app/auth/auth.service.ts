import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { AuthData } from './auth-data.model';
import { throwError } from 'rxjs';
import { Utilisateur } from './utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private token: string = "";

  constructor(private http: HttpClient) { }

  // getToken() {
  //   return this.token
  // }

  // login(email: string, motDePasse: string) {
  //   const authData: AuthData = {email: email, motDePasse: motDePasse};
  //   this.http.post<{token: string}>("http://localhost:3000/api/utilisateur/connexion", authData)
  //     .subscribe(response => {
  //       // console.log(response)
  //       const token = response.token
  //       this.token = token
  //     })
  // }

  login(email: string, motDePasse: string) {
    const authData: AuthData = {email: email, motDePasse: motDePasse};
    return this.http.post<{token: string, data: Utilisateur}>("http://localhost:3000/api/utilisateur/connexion", authData)
  }
}
