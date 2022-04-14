import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-restaurant-gestion',
  templateUrl: './restaurant-gestion.component.html',
  styleUrls: ['./restaurant-gestion.component.css']
})
export class RestaurantGestionComponent implements OnInit, OnDestroy {
  submitted = false;
  ajoutFailed = false;
  public form!: FormGroup;
  imageURL: string = "";
  public errorMessage: string =  "";
  public errorMessageS: string =  "";
  isLoading: boolean = false;

  restaurants: Restaurant[] = [];
  private restosSub: Subscription = new Subscription;
  isSignupFailed: boolean = false;
  public users: Utilisateur[] = [];
  private usersSub: Subscription = new Subscription;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      nom: ['', Validators.required],
      lieu: ['', [Validators.required]],
      avatar: [null, [Validators.required]]
    })
    this.restaurantService.getRestaurant();
    this.restosSub = this.restaurantService.getRestaurantUpdateListener()
      .subscribe((restos: Restaurant[]) => {
        this.restaurants = restos;
      })
    this.userService.getRestaurant()
    this.usersSub = this.userService.getRestoUtilisateursUpdateListener()
      .subscribe((users: Utilisateur[]) => {
        this.users = users;
      })
  }

  constructor(
    private restaurantService: RestaurantService,
    public fb: FormBuilder,
    public userService: UtilisateurService) { }

  ngOnDestroy(): void {
    this.restosSub.unsubscribe()
    this.usersSub.unsubscribe()
  }


  ajout() {
    this.submitted = true;
    this.restaurantService.ajout(
      this.form.value.nom,
      this.form.value.lieu,
      this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.restaurantService.getRestaurant();
          // this.form.reset()
      }
    }, (error) => {
      this.ajoutFailed = true;
      this.errorMessage = error.error.message

    })

  }

  onSignUp(form: NgForm) {

  }

  supprimer(id: string) {
    this.restaurantService.supprimer(id).subscribe(() => {
      this.restaurantService.getRestaurant();
    })
  }

  supprimerU(id: string | undefined) {
    this.userService.supprimer(id).subscribe(() => {
      this.userService.getRestaurant()
    })
  }

  onSignup(form: NgForm) {

    if (form.invalid) {
      return;
    }
    console.log(form.value.restaurant_id)
    this.isLoading = true;
    this.userService.ajout(form.value.nom, form.value.email, form.value.motDePasse, "restaurant", form.value.restaurant_id).subscribe({
      next: data => {
        this.userService.getRestaurant()
        this.isLoading = false;
      },
      error: err => {
        console.log(err)
        this.errorMessageS = err.error.messageS;
        this.isSignupFailed = true;
        this.isLoading = false;
      }
    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement)!.files![0];
    console.log("size", file.size)
    console.log("type", file.type)
    // if(file.size > 2000000) {
    //   this.errorMessage = "Fichier trop volumineux (Max 2mb)"
    //   return
    // }
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}

