import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './auth/auth-interceptor';
import { AccueilComponent } from './accueil/accueil.component';
import { RestaurantListeComponent } from './restaurant/restaurant-liste/restaurant-liste.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from "./error-interceptor";
import { PlatComponent } from './plat/plat.component';
import { PlatListeComponent } from './plat/plat-liste/plat-liste.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PlatDetailComponent } from './plat/plat-detail/plat-detail.component';
import { PanierComponent } from './panier/panier.component';
import { DEFAULT_CURRENCY_CODE,  } from '@angular/core';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CommandeComponent } from './commande/commande.component';
import { CommandeListeComponent } from './commande/commande-liste/commande-liste.component';
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
    ErrorComponent,
    PlatComponent,
    PlatListeComponent,
    PagenotfoundComponent,
    PlatDetailComponent,
    PanierComponent,
    CommandeComponent,
    CommandeListeComponent,
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
      provide: LOCALE_ID, useValue: 'fr-FR'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'Ar'
    },
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
