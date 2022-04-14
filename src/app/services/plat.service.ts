import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Subject } from 'rxjs';
import { Plat } from '../models/plat.model';

const BACKEND_URL = environment.apiUrl + "plat";
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

  getRecherchePlat(restoId: string | null | undefined, cle: string | null | undefined) {
    this.http
      .get<{ message: string; data: any }>(
        BACKEND_URL + "/recherche/" + restoId + "/" + cle
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

  ajout(nomPlat: string,description: string, categorie: string, prixAchat: number, prixVente: number, restaurant_id: string, image: File) {
    console.log(nomPlat)
    let formData: any = new FormData();
    formData.append("nomPlat", nomPlat)
    formData.append("description", description)
    formData.append("categorie", categorie)
    formData.append("prixAchat", prixAchat)
    formData.append("prixVente", prixVente)
    formData.append("restaurant_id", restaurant_id)
    formData.append("avatar", image)
    // console.log(formData)
    return this.http
      .post<{message: string, data: Plat}>(BACKEND_URL + "/ajout",  formData, {
        reportProgress: true,
        observe: 'events',
      });
  }

  supprimer(id: string | undefined) {
    // console.log(BACKEND_URL + "/supprimer")
    return this.http
      .delete<{message: string}>(BACKEND_URL + "/supprimer/" + id);
  }

  update(id: string, nomPlat: string,description: string, categorie: string, prixAchat: number, prixVente: number, restaurant_id: string,avatar: File, etat: string) {
    console.log("tonga")
    console.log("avatar", avatar)
    let formData: any = new FormData();
    formData.append("nomPlat", nomPlat)
    formData.append("description", description)
    formData.append("categorie", categorie)
    formData.append("prixAchat", prixAchat)
    formData.append("prixVente", prixVente)
    formData.append("restaurant_id", restaurant_id)
    formData.append("avatar", avatar)
    formData.append("etat", etat)
    // console.log(formData)
    return this.http
      .put<{message: string, data: Plat}>(BACKEND_URL + "/update/" + id, formData, {
        reportProgress: true,
        observe: 'events',
      });
  }
}
