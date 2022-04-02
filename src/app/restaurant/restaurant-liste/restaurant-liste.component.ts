import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../restaurant.model';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-liste',
  templateUrl: './restaurant-liste.component.html',
  styleUrls: ['./restaurant-liste.component.css']
})
export class RestaurantListeComponent implements OnInit, OnDestroy{

  restaurants: Restaurant[] = [];
  private restosSub: Subscription = new Subscription;

  constructor(public restosService: RestaurantService) { }

  ngOnInit(){
    this.restosService.getRestaurant();
    this.restosSub = this.restosService.getRestaurantUpdateListener()
      .subscribe((restos: Restaurant[]) => {
        this.restaurants = restos;
      })
  }
  ngOnDestroy() {
    this.restosSub.unsubscribe();
  }

}
