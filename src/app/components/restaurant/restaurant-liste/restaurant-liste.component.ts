import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../../../models/restaurant.model';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-liste',
  templateUrl: './restaurant-liste.component.html',
  styleUrls: ['./restaurant-liste.component.css']
})
export class RestaurantListeComponent implements OnInit, OnDestroy{

  restaurants: Restaurant[] = [];
  private restosSub: Subscription = new Subscription;
  public cle: string | null | undefined;
  public isLoading: boolean = false;

  constructor(public restosService: RestaurantService) { }

  ngOnInit(){
    this.isLoading = true
    this.restosService.getRestaurant();
    this.restosSub = this.restosService.getRestaurantUpdateListener()
      .subscribe((restos: Restaurant[]) => {
        this.restaurants = restos;

      })
      this.isLoading = false
  }

  ngOnDestroy() {
    this.restosSub.unsubscribe();
  }

  search(): void {
    this.isLoading = true
    if(this.cle == "") {
      this.restosService.getRestaurant();
    }
    this.restosService.getRestaurantRecherche(this.cle)
    this.restosSub = this.restosService.getRestaurantUpdateListener()
    .subscribe((restos: Restaurant[]) => {
      this.restaurants = restos;
    })
    this.isLoading = false
  }
}
