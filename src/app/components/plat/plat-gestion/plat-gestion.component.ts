import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Plat } from 'src/app/models/plat.model';
import { PlatService } from 'src/app/services/plat.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-plat-gestion',
  templateUrl: './plat-gestion.component.html',
  styleUrls: ['./plat-gestion.component.css']
})
export class PlatGestionComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  submitted = false;
  ajoutFailed = false;
  public form!: FormGroup;
  imageURL: string = "";
  public errorMessage: string =  "";
  private platsSub: Subscription = new Subscription;
  isSignupFailed: boolean = false;
  plats: Plat[] = [];




  constructor(private platService: PlatService, private tokenStorageService: TokenStorageService, public fb: FormBuilder,) { }

  ngOnDestroy(): void {
    this.platsSub.unsubscribe()
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      nomPlat: ['', Validators.required],
      description: [''],
      categorie: ['', [Validators.required]],
      prixAchat: ['', [Validators.required]],
      prixVente: ['', [Validators.required]],
      avatar: ['', [Validators.required]]
    })
    console.log(this.tokenStorageService.getUser().restaurant_id)
    this.platService.getPlat(this.tokenStorageService.getUser().restaurant_id);
    this.platsSub = this.platService.getPlatUpdateListener()
      .subscribe(
      (plats: Plat[]) => {
        this.plats = plats;
      })
  }


  ajout() {
    let restaurant_id: string = this.tokenStorageService.getUser().restaurant_id;
    this.submitted = true;
    console.log(this.form.value)
    this.platService.ajout(
      this.form.value.nomPlat,
      this.form.value.description,
      this.form.value.categorie,
      this.form.value.prixAchat,
      this.form.value.prixVente,
      restaurant_id,
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
          this.platService.getPlat(restaurant_id)
          // this.form.reset()
      }
    }, (error) => {
      this.ajoutFailed = true;
      this.errorMessage = error.error.message
    })

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement)!.files![0];
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

  supprimer(id: string) {
    this.platService.supprimer(id).subscribe(() => {
      let restaurant_id: string = this.tokenStorageService.getUser().restaurant_id;
      this.platService.getPlat(restaurant_id);
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
