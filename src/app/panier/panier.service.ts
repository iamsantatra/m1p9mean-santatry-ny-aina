import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Plat } from '../plat/plat.model';
import { Item } from './item.entity';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private items: Item[] = [];
  // private itemsUpdated = new Subject<Item[]>();
  // private itemsStatus = new Subject<boolean>();

  constructor() {
  }

  // ajoutPanier(quantite: number, plat: Plat) {

  //   let item: Item = {
  //     plat: plat,
  //     quantite: quantite,
  //   };
  //   if (localStorage.getItem('panier') == null) {
  //     let cart: any = [];
  //     cart.push(JSON.stringify(item));
  //     localStorage.setItem('panier', JSON.stringify(cart));
  //   } else {
  //     let cart: any = JSON.parse(localStorage.getItem('panier') || '{}');
  //     let index: number = -1;
  //     for (var i = 0; i < cart.length; i++) {
  //       let item: any = JSON.parse(JSON.stringify(cart[i]));
  //       if (item.id == plat.id) {
  //         index = i;
  //         break;
  //       }
  //     }
  //     if (index == -1) {
  //       cart.push(JSON.stringify(item));
  //       localStorage.setItem('panier', JSON.stringify(cart));
  //     } else {
  //       let item: Item = JSON.parse(JSON.stringify(cart[index]));
  //       item.quantite += quantite;
  //       cart[index] = JSON.stringify(item);
  //       localStorage.setItem("panier", JSON.stringify(cart));
  //     }
  //   }
  //   this.loadCart();
  //   this.itemsUpdated.next({
  //     items: [...this.items],
  //     total: this.total
  //   })
  // }

  // loadCart(): void {
  //   this.total = 0;
  //   this.items = [];
  //   let cart = JSON.parse(localStorage.getItem('panier') || '{}');
  //   for (var i = 0; i < cart.length; i++) {
  //     let item: Item = JSON.parse(cart[i]);
  //     this.items.push({
  //       plat: item.plat,
  //       quantite: item.quantite
  //     });
  //     console.log(this.items)
  //     this.total += item.plat.prixVente * item.quantite;
  //   }
  //   this.itemsUpdated.next({
  //     items: [...this.items],
  //     total: this.total
  //   })
  // }


  // remove(id: string): void {
  //   let cart: any = JSON.parse(localStorage.getItem('panier') || '{}');
  //   let index: number = -1;
  //   for (var i = 0; i < cart.length; i++) {
  //     let item: Item = JSON.parse(cart[i]);
  //     if (item.plat.id == id) {
  //       cart.splice(i, 1);
  //       break;
  //     }
  //   }
  //   localStorage.setItem("panier", JSON.stringify(cart));
  //   this.loadCart();
  //   this.itemsUpdated.next({
  //     items: [...this.items],
  //     total: this.total
  //   })
  // }

  // getItems() {
  //   // console.log("Panier: ", JSON.parse(localStorage.getItem('panier') || '{}'));
  //   // return JSON.parse(localStorage.getItem('panier') || '{}')
  //   //  return json.subscribe((items: Item[]) => {
  //   //     console.log(this.items)
  //   //     this.items = items;
  //   //     this.itemsUpdated.next({
  //   //       items: [...this.items],
  //   //       total: this.total
  //   //     });
  //   //   });
  //   // return this.items;
  //   //return this.items =
  //  let itemVao: Item[] = [];
  //   let cart = JSON.parse(localStorage.getItem('panier') || '{}');
  //   for (var i = 0; i < cart.length; i++) {
  //     let item: Item = JSON.parse(cart[i]);
  //     itemVao.push({
  //       plat: item.plat,
  //       quantite: item.quantite
  //     });
  //     this.total += item.plat.prixVente * item.quantite;
  //   }
  //   this.itemsUpdated.next({
  //     items: cart,
  //     total: this.total
  //   })
  //   return [...itemVao];
  //  }

  itemInCart(item: Item): boolean {
    return this.items.findIndex(o => o.plat.id === item.plat.id) > -1;
  }

  // getItemsUpdateListener() {
  //   // this.loadCart()
  //   return this.itemsUpdated.asObservable()
  // }

  // getItemsStatusListener() {
  //   // this.loadCart()
  //   return this.itemsStatus.asObservable()
  // }

  addToCart(addedItem: Item) {
    this.items.push(addedItem);
    // console.log(addedItem);

    //-----check if there are items already added in cart
    /* let existingItems = [];
    if ( localStorage.getItem('cart_items')){//----- update by adding new items
      existingItems = JSON.parse(localStorage.getItem('cart_items'));
      existingItems = [addedItem, ...existingItems];
      console.log( 'Items exists');
    } */
    //-----if no items, add new items
    /* else{
      console.log( 'NO items exists');
      existingItems = [addedItem]
    } */
    this.saveCart();
    // console.log(this.items)
    // this.itemsUpdated.next([...this.items]);
    // this.itemsStatus.next(true);
  }

  getItems() {
    return this.items;
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    // this.itemsUpdated.next([...this.items]);
    console.log("load panier "+this.items)
  }
  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem("cart_items") || '{}')
    // console.log("load panier "+this.items)
  }

  clearCart(items: Item[]) {
    this.items = [];
    localStorage.removeItem("cart_items")
    // this.itemsStatus.next(false);
  }

  removeItem(item: Item) {
    const index = this.items.findIndex(o => o.plat.id === item.plat.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }
}
