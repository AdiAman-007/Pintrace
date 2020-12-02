import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  username:string;
  constructor(private _auth:AuthenticationService) { }

  ngOnInit(): void {
    this.username = JSON.parse(this._auth.getUser()).name;
    console.log(this.username);
  }

  logout(){
    this._auth.logoutUser();
  }

}
