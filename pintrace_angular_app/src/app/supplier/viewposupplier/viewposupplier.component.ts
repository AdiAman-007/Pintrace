import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/_services/supplier.service';
@Component({
  selector: 'app-viewposupplier',
  templateUrl: './viewposupplier.component.html',
  styleUrls: ['./viewposupplier.component.css']
})
export class ViewposupplierComponent implements OnInit {
  poid;
  podata;
  pinarray;
  payload:any = {};
  selectedPart:any = {};
  constructor(private _supplierService:SupplierService, private _auth:AuthenticationService, private toastr:ToastrService, private activatedRoute:ActivatedRoute, private router:Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.poid = params.get('poid')
      this._supplierService.getPO(this.poid).subscribe(
        res => {
          this.podata=res
          if(this.podata.status=="packed" || this.podata.status=="shipped" || this.podata.status=="delivered" ){
            this._supplierService.getPins({poid:this.podata._id}).subscribe(
              res => {
                this.pinarray = res
                this.selectedPart =this.pinarray[0]
              },
              err => this.toastr.error()
            )
          }
        },
        err => this.toastr.error("Failed to load po data")
      )
    });
  }

  createPackage(){
    this.payload.poid = this.podata._id
    this.payload.partList = this.podata.partlist
    this._supplierService.createPackage(this.payload).subscribe(
      res => {
        this.toastr.success("Pins attached and package created")
        this.reload()
      },
      err => this.toastr.error("Failed to create pakage")
    )
  }

  createShipment(){
    this._supplierService.createShipment({'poid':this.podata._id}).subscribe(
      res=>{
        this.toastr.success("Package shipped")
        this.reload()
      },
      err => this.toastr.error("Package shipment failed")
    )
  }

  showPartDetails(pin){
    for(let items in this.pinarray){
      if(this.pinarray[items]._id == pin){
        this.selectedPart = this.pinarray[items]
      }
    }
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/supplier/po/'+this.poid]);
  }
}
