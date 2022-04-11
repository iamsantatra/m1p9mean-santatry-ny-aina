import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant.model';

const BACKEND_URL = environment.apiUrl + "restaurant";
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurants: Restaurant[] = [];
  private restaurantsUpdated = new Subject<Restaurant[]>();

  constructor(private http: HttpClient) {}

  getRestaurant() {
    this.http
      .get<{ message: string; data: any }>(
        BACKEND_URL + "/liste"
      )
      .pipe(map((restoData) => {
        return restoData.data.map((restaurant: { _id: string; nom: string; image: string; lieu: string; }) => {
          return {
            id: restaurant._id,
            nom: restaurant.nom,
            image: restaurant.image,
            lieu: restaurant.lieu
          };
        });
      }))
      .subscribe(transformedResto => {
        this.restaurants = transformedResto;
        this.restaurantsUpdated.next([...this.restaurants]);
      });
  }

  getRestaurantUpdateListener() {
    return this.restaurantsUpdated.asObservable();
  }
}
