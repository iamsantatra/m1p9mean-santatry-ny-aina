import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccueilComponent } from "./accueil/accueil.component";

import { ConnexionComponent } from "./auth/connexion/connexion.component";
import { RestaurantListeComponent } from "./restaurant/restaurant-liste/restaurant-liste.component";

const routes: Routes = [
  { path: "", component: AccueilComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "restaurant", component: RestaurantListeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
