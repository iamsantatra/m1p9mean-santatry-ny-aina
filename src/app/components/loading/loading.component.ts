import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() visible: Boolean = true;
  loadingSubscription!: Subscription;

  constructor(private loadingScreenService: LoadingService) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
