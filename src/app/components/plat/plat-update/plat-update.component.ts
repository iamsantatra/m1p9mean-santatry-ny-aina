import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlatService } from 'src/app/services/plat.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-plat-update',
  templateUrl: './plat-update.component.html',
  styleUrls: ['./plat-update.component.css']
})
export class PlatUpdateComponent implements OnInit {

  public isLoading: boolean = false;
  submitted = false;
  ajoutFailed = false;
  public form!: FormGroup;
  imageURL: string = "";
  public errorMessage: string =  "";
  isSignupFailed: boolean = false;

  // update-plat/:nomPlat/:description/:categorie/:prixAchat/:prixVente/:restaurant_id/:etat
  constructor(private route: ActivatedRoute, private platService: PlatService, private tokenStorageService: TokenStorageService, public fb: FormBuilder, private redirect: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.form = this.fb.group({
        id: [this.route.snapshot.paramMap.get('id'), Validators.required],
        nomPlat: [this.route.snapshot.paramMap.get('nomPlat'), Validators.required],
        description: [this.route.snapshot.paramMap.get('description')],
        categorie: [this.route.snapshot.paramMap.get('categorie'), [Validators.required]],
        prixAchat: [this.route.snapshot.paramMap.get('prixAchat'), [Validators.required]],
        prixVente: [this.route.snapshot.paramMap.get('prixVente'), [Validators.required]],
        etat: [this.route.snapshot.paramMap.get('etat'), [Validators.required]],
        avatar: [""]
      })
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  modifier() {
    console.log(this.form.value.description)
    console.log(this.form.value.etat)
    console.log(this.form.value.avatar)
    this.platService.update(
      this.form.value.id,
      this.form.value.nomPlat,
      this.form.value.description,
      this.form.value.categorie,
      this.form.value.prixAchat,
      this.form.value.prixVente,
      this.tokenStorageService.getUser().restaurant_id,
      this.form.value.avatar,
      this.form.value.etat
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
      }
      this.redirect.navigate(['repas'])
    }, (error) => {
      console.log(error)
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
}
