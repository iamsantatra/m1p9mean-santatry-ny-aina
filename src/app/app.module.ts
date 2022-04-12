import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';
import { InscriptionComponent } from './components/auth/inscription/inscription.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { AccueilComponent } from './components/accueil/accueil.component';
import { RestaurantListeComponent } from './components/restaurant/restaurant-liste/restaurant-liste.component';
import { ErrorComponent } from './components/error/error.component';
import { ErrorInterceptor } from "./interceptor/error-interceptor";
import { PlatComponent } from './components/plat/plat.component';
import { PlatListeComponent } from './components/plat/plat-liste/plat-liste.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PlatDetailComponent } from './components/plat/plat-detail/plat-detail.component';
import { PanierComponent } from './components/panier/panier.component';
import { DEFAULT_CURRENCY_CODE,  } from '@angular/core';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CommandeComponent } from './components/commande/commande.component';
import { CommandeListeComponent } from './components/commande/commande-liste/commande-liste.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmationComponent } from './components/auth/inscription/confirmation/confirmation.component';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    RestaurantListeComponent,
    PlatComponent,
    PlatListeComponent,
    PagenotfoundComponent,
    PlatDetailComponent,
    PanierComponent,
    CommandeComponent,
    CommandeListeComponent,
    LoadingComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID, useValue: 'fr'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'Ar'
    },
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
