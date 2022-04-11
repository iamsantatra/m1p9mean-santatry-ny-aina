import { Component, Inject, Injectable } from "@angular/core";
import { Subscription } from "rxjs";

import { ErrorService } from "../../services/error.service";

@Component({
  templateUrl: "./error.component.html",
  selector: "app-error"
})
@Injectable()
export class ErrorComponent {
  data!: { message: string; };
  private errorSub!: Subscription;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorSub = this.errorService.getErrorListener().subscribe((message: any) => {
      this.data = { message: message };
    });
  }

  onHandleError() {
    this.errorService.handleError();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
