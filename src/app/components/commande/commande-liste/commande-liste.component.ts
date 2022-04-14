import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Commande } from 'src/app/models/commande.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { VCommande } from 'src/app/models/vcommande.model';
import { Vbenefice } from 'src/app/models/vbenefice.model';
import { CommandeService } from 'src/app/services/commande.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrls: ['./commande-liste.component.css']
})
export class CommandeListeComponent implements OnInit, OnDestroy {

  public commandes: VCommande[] = [];
  public commandesSub: Subscription = new Subscription;
  public benefices: Vbenefice[] = [];
  public beneficeSub: Subscription = new Subscription;
  public type!: string;
  errorMessage: string = "";
  public users: Utilisateur[] = [];
  public usersSub: Subscription = new Subscription;
  public selectedOption!: string ;
  etat: string | null | undefined;

  constructor(
    public commandesService: CommandeService,
    public tokenStorageService: TokenStorageService,
    public route: ActivatedRoute,
    public redirect: Router,
    public userService: UtilisateurService,
    ) { }

  ngOnInit(){
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   console.log("ato")
    //   if (paramMap.has("commandeId")) {
    //     let id: string | null | undefined  = paramMap.get("commandeId");
    //     this.commandesService.commander(id)
    //   } else {
    //     this.redirect.navigate(['commande'])
    //   }
    // })
    this.type = this.tokenStorageService.getUser().type;
    this.commandesService.getCommande();
    console.log(this.commandesService.getCommande())
    console.log(new Date())
    this.commandesSub = this.commandesService.getCommandeUpdateListener()
      .subscribe((coms: VCommande[]) => {
        this.commandes = coms;
      })
    this.userService.getLivreur()
    this.usersSub = this.userService.getUtilisateursUpdateListener()
    .subscribe((users: Utilisateur[]) => {
      this.users = users;
      console.log(users)
    })

    this.commandesService.getBeneficeResto()
    this.beneficeSub = this.commandesService.getBeneficeUpdateListener()
    .subscribe((benefices: Vbenefice[]) => {
      this.benefices = benefices;
      console.log(benefices)
    })

    // console.log(this.tokenStorageService.getUser());

  }
  ngOnDestroy() {
    this.commandesSub.unsubscribe();
  }

  search() {
    this.commandesService.getCommandeRecherche(this.etat)
    this.commandesSub = this.commandesService.getCommandeUpdateListener()
    .subscribe((coms: VCommande[]) => {
      this.commandes = coms;
    })
  }

  commander(id: string | null | undefined) {
    if (!id) {
      return;
    }
    // console.log(id)
    // console.log(this.selectedOption)
    this.commandesService.commander(id, this.selectedOption).subscribe({
      next: (message: any) => {
        console.log(message)
        this.commandesService.getCommande();
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
      }
    });
  }

  annuler(id: string | null | undefined) {
    if (!id) {
      return;
    }
    console.log(id)
    this.commandesService.annuler(id).subscribe({
      next: (message: any) => {
        console.log(message)
        this.commandesService.getCommande();
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
      }
    });
  }

}
