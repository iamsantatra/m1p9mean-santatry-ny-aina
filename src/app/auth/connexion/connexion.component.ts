import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  isLoading = false;
  isSignInFailed: boolean = false;
  errorMessage: string = "";

  constructor(public authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    // this.isLoading = true
    if(form.invalid)
      return;
    // console.log(form.value);
    this.authService.login(form.value.email, form.value.motDePasse).subscribe(
      data => {
        // console.log(data.data);
        this.isSignInFailed = false;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.data);
        // this.isLoading = false
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignInFailed = true;
        // this.isLoading = false
      }
    )
  }
}
