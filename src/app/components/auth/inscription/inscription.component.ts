import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public isLoading: boolean = false;
  errorMessage!: string;
  isSignupFailed: boolean = false;
  loader = true;
  succes!: string;
  isSignupSucces: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader = false;
    }, 1000);
  }

  onSignup(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signUp(form.value.nom, form.value.email, form.value.motDePasse).subscribe({
      next: data => {
        this.succes = data.message;
        this.isLoading = false;
        this.isSignupSucces = true;
        // this.router.navigate(["/restaurant"]);
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
        this.isLoading = false;
      }
    });

  }

}
