import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../../../models/item.entity';
import { PanierService } from '../../../services/panier.service';
import { Plat } from '../../../models/plat.model';
import { PlatService } from '../../../services/plat.service';

@Component({
  selector: 'app-plat-detail',
  templateUrl: './plat-detail.component.html',
  styleUrls: ['./plat-detail.component.css']
})
export class PlatDetailComponent implements OnInit {

  plat!: Plat;
  prixVente!: string;
  items: Item[] = [];

  private platSub: Subscription = new Subscription;
  private platId: string | null | undefined;

  constructor(
    public platService: PlatService,
    public route: ActivatedRoute,
    private redirect: Router,
    public panierService: PanierService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("platId")) {
        this.platId = paramMap.get("platId");
        this.platService.getDetailPlat(this.platId);
        this.platSub = this.platService.getDetailPlatUpdateListener()
          .subscribe(
          (plat: Plat) => {
            this.plat = plat;
          })
      } else {
        this.redirect.navigate(['**'])
      }
    })
  }
  ngOnDestroy() {
    this.platSub.unsubscribe();
  }

  // onAjout(form: NgForm, plat: Plat) {
  //   // this.isLoading = true
  //   if(form.invalid)
  //     return;
  //   // console.log(form.value);
  //   this.panierService.ajoutPanier(form.value.quantite, plat)
  // }

  onAjout(plat: Plat) {
    const item: Item = {
      plat: plat,
      quantite: 1
    };
    if (!this.panierService.itemInCart(item)) {
      item.quantite = 1;
      this.panierService.addToCart(item); //add items in cart
      this.items = this.panierService.getItems();
    }
  }
}
