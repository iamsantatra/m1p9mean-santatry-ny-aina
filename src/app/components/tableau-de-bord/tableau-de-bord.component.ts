import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vbenefice } from 'src/app/models/vbenefice.model';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  public benefices: Vbenefice[] = [];
  public beneficeSub: Subscription = new Subscription;

  constructor(private commandesService: CommandeService) { }

  ngOnInit(): void {
    this.commandesService.getBeneficeResto()
    this.beneficeSub = this.commandesService.getBeneficeUpdateListener()
    .subscribe((benefices: Vbenefice[]) => {
      this.benefices = benefices;
      console.log(benefices)
    })
  }

}
