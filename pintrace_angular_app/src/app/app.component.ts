import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pintrace';

  constructor(      
    private route: ActivatedRoute,
    private router: Router,
    private _auth:AuthenticationService
  ){}

  ngOnInit() {
    if(this._auth.loggedIn()){
      let user:any = JSON.parse(this._auth.getUser())
      console.log(user)
      if(user.type == 'manufacturer'){
        this.router.navigate(['manufacturer/dashboard'])
      }
      if(user.type == 'supplier'){
        this.router.navigate(['supplier/dashboard'])
      } 
      else {
        this.router.navigate(['/login'])
      }
    }
  }
}
