import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private _loginUrl = "http://localhost:3000/authenticateUser";

    constructor(private http: HttpClient, private router:Router) {
    }


    login(userOb) {
        return this.http.post<any>(this._loginUrl, userOb)
    }

    loggedIn(){
        return !!localStorage.getItem('token')
    }

    getToken(){
        return localStorage.getItem('token')
    }

    getUser(){
        let token:string = localStorage.getItem('token')
        let user = atob(token.split('.')[1])
        return user;
    }

    logoutUser(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}