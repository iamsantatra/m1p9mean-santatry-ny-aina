import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccueilComponent } from "./accueil/accueil.component";
import { ConnexionComponent } from "./auth/connexion/connexion.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { PanierComponent } from "./panier/panier.component";
import { PlatDetailComponent } from "./plat/plat-detail/plat-detail.component";
import { PlatListeComponent } from "./plat/plat-liste/plat-liste.component";
import { RestaurantListeComponent } from "./restaurant/restaurant-liste/restaurant-liste.component";

const routes: Routes = [
  { path: "", component: AccueilComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "restaurant", component: RestaurantListeComponent },
  { path: "listePlat/:restoId", component: PlatListeComponent },
  { path: "detailPlat/:platId", component: PlatDetailComponent },
  { path: "panier", component: PanierComponent },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full',
  component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
