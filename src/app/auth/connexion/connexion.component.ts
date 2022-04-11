import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{

  isLoading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  type: string = '';
  constructor(
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    public router: Router) {}

  ngOnInit() {

    // console.log(this.tokenStorage.getToken())
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.type = this.tokenStorage.getUser().type;
      // this.redirection(this.type)
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.motDePasse).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.type = this.tokenStorage.getUser().type;
        this.redirection(this.type)
      },


      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
    this.isLoading = false;
  }

  redirection(type: string) {
    switch(type) {
      case 'client':
        this.router.navigate(["/"]);
        break;
      case 'e-kaly':
        this.router.navigate(["/commande"]);
        break;
      case 'livreur':
        this.router.navigate(["/livraison"]);
        break;
      case 'restaurant':
        this.router.navigate(["/commande"]);
        break;
      default:
        this.router.navigate(["/"]);
        break;
    }
  }
}
