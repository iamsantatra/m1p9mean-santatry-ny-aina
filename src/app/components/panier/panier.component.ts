import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';
import { Commande } from '../../models/commande.model';
import { CommandeService } from '../../services/commande.service';
import { Plat } from '../../models/plat.model';
import { Item } from '../../models/item.entity';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  items: Item[] = [];
  public sousTotalC! : number;
  public livraison!: number;
  public errorMessage!: string;
  public commandeFailed: boolean = false
  @ViewChildren("subTotalWrap")
  subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing")
  subTotalItems_existing!: QueryList<
    ElementRef
  >;

  // private itemsSub: Subscription = new Subscription;
  // private totalSub: Subscription = new Subscription;

  ngOnInit(): void {

    this.panierService.loadCart();
    this.items = this.panierService.getItems();
    // this.itemsSub = this.panierService.getItemsUpdateListener()
    //   .subscribe((items: Item[]) => {
    //     this.items = items;
    //     console.log(this.items)
    //   });
  }

  //----- calculate total
  get sousTotal() {
    if(this.items.length) {
    return this.items.reduce(
      (sum, x) => ({
        quantite: 1,
        prixVente: sum.prixVente + x.quantite * x.plat.prixVente
      }),
      { quantite: 1, prixVente: 0 }
    ).prixVente;
    } return 0;
  }


  changeSubtotal(item: Item, index: number) {
    const qty = item.quantite;
    const amt = item.plat.prixVente;
    const subTotal = amt * qty;
    const subTotal_converted = this.currencyPipe.transform(subTotal, "Ar");

    this.subTotalItems.toArray()[
      index
    ].nativeElement.innerHTML = subTotal_converted;
    this.panierService.saveCart();
  }


  //----- remove specific item
  removeFromCart(item: Item) {
    this.panierService.removeItem(item);
    this.items = this.panierService.getItems();
  }

  //----- clear cart item
  clearCart(items: Item[]) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.panierService.clearCart(items);
    // this.items = [...this.panierService.getItems()];
  }


  // ngOnDestroy(): void {
  //   this.itemsSub.unsubscribe();
  // }

  constructor(private panierService: PanierService,
    private currencyPipe: CurrencyPipe,
    private tokenStorageService: TokenStorageService,
    private redirect: Router,
    private commandeService: CommandeService,
    private datePipe: DatePipe
    )   {
      this.currentDateTime =this.datePipe.transform((new Date), 'yyyy/MM/dd');
     }

  // onCommande(form: NgForm, items: Item[]) {
  //   if(form.invalid)
  //     return

  //   // for(let i = 0; i < items.length; i++) {

  //   //   console.log(items[i])
  //   // }
  //   let connecter: boolean = !!this.tokenStorageService.getToken();
  //   if (connecter) {
  //     console.log("connecter")
  //   } else {
  //     this.redirect.navigate(['/connexion'])
  //   }

  // }

  commande(items: Item[], form: NgForm) {
    console.log(form.value)
    if(form.invalid) {
      return;
    }
    let connecter: boolean = !!this.tokenStorageService.getToken();

    let prixLivraison = 10000
    let typeLivraison = "peripherie"
    if(form.value.typeLivraison == "7000") {
      prixLivraison = 7000
      typeLivraison = "ville"
    }

    let dateLivraison = new Date(form.value.dateLivraison+" "+form.value.timeLivraison)
    // dateLivraison = new Date(dateLivraison.getFullYear(), dateLivraison.getMonth(), dateLivraison.getDay(), dateLivraison.getHours(), dateLivraison.getMinutes(), dateLivraison.getSeconds(), 0)
    console.log("Date "+dateLivraison)

      // const nDate = new Date().toLocaleString('fr-FR', {
      //   timeZone: 'Africa/Nairobi'
      // });
      // console.log("Date zao "+nDate)
    if (connecter) {
      for(let i = 0; i < items.length; i++) {
        let commande: Commande = {
          plat_id : items[i].plat.id,
          quantite : items[i].quantite,
          lieu : form.value.lieu,
          typeLivraison : typeLivraison,
          dateLivraison :form.value.dateLivraison+" "+form.value.timeLivraison ,
          etat: 0,
          prixLivraison: prixLivraison,
          sumPrixAchat: 0,
          sumPrixVente: 0
        }

        // const postData = new FormData();
        // postData.append("plat_id", items[i].plat.id);
        // postData.append("quantite", items[i].quantite);
        // postData.append("lieu", form.value.lieu);

        this.commandeService.ajout(commande).subscribe((result) => {
          console.log(result)
          localStorage.removeItem('cart_items');
          this.redirect.navigate(['/restaurant'])
        }, (error) => {
          console.log(error)
          this.errorMessage = error.error.message;
          this.commandeFailed = true;
        })
      }
    } else {
      this.redirect.navigate(['/connexion'])
    }
  }

  currentDateTime: String | null = "";
}
