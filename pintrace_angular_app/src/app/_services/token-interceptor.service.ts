import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
// import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  // private route:string;

  constructor(private injector: Injector) { }

  intercept(req, next) {

    let auth = this.injector.get(AuthenticationService)
    let router = this.injector.get(Router)
    if(router.url !== '/login'){
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
    }
    else return next.handle(req)
  }
}
