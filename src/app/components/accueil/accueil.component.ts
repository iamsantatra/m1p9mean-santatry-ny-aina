import { Component, OnInit } from '@angular/core';
import { NgModule} from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  loader: boolean = true;
  constructor() { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.loader = false;
    }, 1000);
  }

}
