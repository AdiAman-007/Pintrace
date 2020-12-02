import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
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
