import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PanierService } from "src/app/services/panier.service";

import { TokenStorageService } from "../../services/token-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  private type: string = ''
  isLoggedIn = false;
  showLivreurBoard = false;
  showRestaurantBoard = false;
  showEKalyBoard = false;
  showClientBoard = false;
  nom!: string;
  itemsSub: Subscription = new Subscription;
  status: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private redirect: Router, private panierService: PanierService) { }

  ngOnInit(): void {
    // console.log("token-header "+this.tokenStorageService.getToken())
    // this.itemsSub = this.panierService.getItemsStatusListener()
    //   .subscribe(() => {
    //     this.status = true;
    //   });
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.type = user.type;
      this.showLivreurBoard = this.type.includes('livreur');
      this.showEKalyBoard = this.type.includes('e-kaly');
      this.showRestaurantBoard = this.type.includes('restaurant');
      this.showClientBoard = this.type.includes('client');
      this.nom = user.nom;
    }
  }

  onLogout(): void {
    this.tokenStorageService.signOut();
    this.redirect.navigate(["/connexion"])
  }
}
