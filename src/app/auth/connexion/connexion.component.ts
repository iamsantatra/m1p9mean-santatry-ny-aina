import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  isLoading = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    // this.isLoading = true
    if(form.invalid)
      return;
    // console.log(form.value);
    this.authService.login(form.value.email, form.value.motDePasse)
  }

}
