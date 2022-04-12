import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-livreur-udpate',
  templateUrl: './livreur-update.component.html',
  styleUrls: ['./livreur-update.component.css']
})
export class LivreurUpdateComponent implements OnInit {

  public id: string | null= "";
  public nom: string | null= "";
  public email: string | null= "";
  isLoading: boolean = false;
  isModifyFailed: boolean = false;
  errorMessage: any;
  constructor(private route: ActivatedRoute,
    private redirect: Router,
    private userService: UtilisateurService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("id") && paramMap.has("nom") && paramMap.has("email")) {
        this.id=paramMap.get("id")
        this.nom=paramMap.get("nom")
        this.email=paramMap.get("email")
      } else {
        this.redirect.navigate(['**'])
      }
    })
  }

  update(form: NgForm) {
    console.log(form.value.id)
    this.userService.update(this.route.snapshot.paramMap.get('id') , form.value.nom, form.value.email, form.value.motDePasse).subscribe({
      next: (data)=> {
        console.log(data)
        this.isLoading = false;
        this.userService.getLivreur()
        this.redirect.navigate(['livreur'])
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isModifyFailed = true;
        this.isLoading = false;
      }
    })
  }

}
