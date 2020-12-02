import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MaunfacturerGuardGuard implements CanActivate {
  constructor(private _auth:AuthenticationService, private _router:Router) { }

  canActivate(): boolean {
    if(this._auth.loggedIn()){
      let user:any = JSON.parse(this._auth.getUser());
      if(user.type == 'manufacturer'){
        return true
      }
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
  
}