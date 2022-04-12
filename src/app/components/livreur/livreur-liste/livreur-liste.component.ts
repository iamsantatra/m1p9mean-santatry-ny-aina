import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-livreur-liste',
  templateUrl: './livreur-liste.component.html',
  styleUrls: ['./livreur-liste.component.css']
})
export class LivreurListeComponent implements OnInit {

  public isLoading: boolean = false;
  public errorMessage: string = "";
  public isSignupFailed: boolean = false;
  public users: Utilisateur[] = [];
  public usersSub: Subscription = new Subscription;
  public isModifyFailed: boolean = false;
  public errorMessageM: string = "";

  constructor(private userService: UtilisateurService, private redirect: Router) { }

  ngOnInit(): void {
    this.userService.getLivreur()
      this.usersSub = this.userService.getUtilisateursUpdateListener()
      .subscribe((users: Utilisateur[]) => {
        this.users = users;
        console.log(users)
      })
  }


  onSignup(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.ajout(form.value.nom, form.value.email, form.value.motDePasse, "livreur").subscribe({
      next: data => {
        this.userService.getLivreur()
        this.isLoading = false;
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
        this.isLoading = false;
      }
    });

  }

  supprimer(id: string | undefined) {
    // console.log("ato")
    this.userService.supprimer(id).subscribe({
      next: (data)=> {
        console.log(data)
        this.userService.getLivreur()
      },
      error: err => {
        console.log(err)
      }
    })
    // this.userService.getLivreur()
  }


  update(id: string, nom: string, email: string, motDePasse: string) {
    this.userService.update(id, nom, email, motDePasse).subscribe({
      next: (data)=> {
        console.log(data)
        this.isLoading = false;
        this.redirect.navigate(['livreur'])
      },
      error: err => {
        console.log(err)
        this.errorMessageM = err.error.message;
        this.isModifyFailed = true;
        this.isLoading = false;
      }
    })
  }
}
