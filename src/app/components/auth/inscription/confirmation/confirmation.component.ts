import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  loader: boolean = true;

  constructor(private authService: AuthService,public route: ActivatedRoute,
    private redirect: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("confirmation")) {
        paramMap.get("confirmation");
        this.authService.confirmation(paramMap.get("confirmation"))?.subscribe((data: any) => console.log(data));
            setTimeout(()=>{
          this.loader = false;
        }, 2000);
        this.redirect.navigate(['/connexion'])
      } else {
        this.redirect.navigate(['**'])
      }
    })
  }

}
