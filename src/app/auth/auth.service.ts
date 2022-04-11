import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { AuthData } from './auth-data.model';
import { ReplaySubject, Subject, tap, throwError } from 'rxjs';
import { Utilisateur } from './utilisateur.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + "utilisateur/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = "";
  private authStatusListener = new ReplaySubject<boolean>(1);
  private tokenTimer: any;
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getToken() {
    return this.token
  }

  // login(email: string, motDePasse: string) {
  //   const authData: AuthData = {email: email, motDePasse: motDePasse};
  //   this.http.post<{token: string}>("http://localhost:3000/api/utilisateur/connexion", authData)
  //     .subscribe(response => {
  //       // console.log(response)
  //       const token = response.token
  //       this.token = token
  //     })
  // }

  // checkLogin(email: string, motDePasse: string) {
  //   const authData: AuthData = {email: email, motDePasse: motDePasse};
  //   return this.http.post<{token: string, data: Utilisateur}>(BACKEND_URL + "/connexion", authData)
  // }

  login(email: string, motDePasse: string) {
    const authData: AuthData = { email: email, motDePasse: motDePasse };
    return this.http
      .post<{token: string, data: Utilisateur, expiresIn: number}>(BACKEND_URL + "connexion", authData)
      // .subscribe(response => {
      //   const token = response.token
      //   this.token = token
      //   if (token) {
      //     this.authStatusListener.next(true)
      //     const expiresInDuration = response.expiresIn;
      //     this.setAuthTimer(expiresInDuration);
      //     this.isAuthenticated = true;
      //     const now = new Date();
      //     const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      //     // console.log(expirationDate);
      //     this.saveAuthData(token, expirationDate);
      //     console.log(response.data.type)
      //     switch(response.data.type) {
      //       case 'client':
      //         this.router.navigate(["/"]);
      //         break;
      //       case 'e-kaly':
      //         this.router.navigate(["/commande"]);
      //         break;
      //       case 'livreur':
      //         this.router.navigate(["/livraison"]);
      //         break;
      //       case 'restaurant':
      //         this.router.navigate(["/commande"]);
      //         break;
      //       default:
      //         this.router.navigate(["/"]);
      //         break;
      //     }
      //   }
      // },
      // error => {
      //   this.authStatusListener.next(false);
      // })
    // console.log(this.token)
  }
}
