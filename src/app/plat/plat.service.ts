import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Subject } from 'rxjs';
import { Plat } from './plat.model';

const BACKEND_URL = environment.apiUrl + "/plat";
@Injectable({
  providedIn: 'root'
})
export class PlatService {

  private plats: Plat[] = [];
  private platsUpdated = new Subject<Plat[]>();

  private detailPlat!: Plat;
  private detailPlatUpdated = new Subject<Plat>();

  constructor(private http: HttpClient) { }

  getPlat(restoId: string | null | undefined) {
    this.http
      .get<{ message: string; data: any }>(
        BACKEND_URL + "/listePlatRestaurant/" + restoId
      )
      .pipe(map((platData) => {
        return platData.data.map((plat: any) => {
          return {
            id: plat._id,
            nomPlat: plat.nomPlat,
            description: plat.description,
            categorie: plat.categorie,
            prixVente: plat.prixVente,
            prixAchat: plat.prixAchat,
            etat: plat.etat,
            image: plat.image,
            restaurant_id: plat.restaurant_id,
          };
        });
      }))
      .subscribe(transformedResto => {
        this.plats = transformedResto;
        this.platsUpdated.next([...this.plats]);
      });
  }

  getDetailPlat(platId: string | null | undefined) {
    this.http
      .get<{ message: string; data: any }>(
        BACKEND_URL + "/detailPlat/" + platId
      )
      .pipe(map((platData) => {
          return {
            id: platData.data._id,
            nomPlat: platData.data.nomPlat,
            description: platData.data.description,
            categorie: platData.data.categorie,
            prixVente: platData.data.prixVente,
            prixAchat: platData.data.prixAchat,
            etat: platData.data.etat,
            image: platData.data.image,
            restaurant_id: platData.data.restaurant_id,
          };
      }))
      .subscribe(transformedResto => {
        this.detailPlat = transformedResto;
        this.detailPlatUpdated.next(this.detailPlat);
      });
  }

  getPlatUpdateListener() {
    return this.platsUpdated.asObservable();
  }

  getDetailPlatUpdateListener() {
    return this.detailPlatUpdated.asObservable();
  }
}
