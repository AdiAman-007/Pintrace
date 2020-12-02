import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-viewpo',
  templateUrl: './viewpo.component.html',
  styleUrls: ['./viewpo.component.css']
})
export class ViewpoComponent implements OnInit {
  poid;
  podata;
  pinarray;
  selectedPart:any = {};
  constructor(private _manufacturerService:ManufacturerService, private _supplierService:SupplierService, private _auth:AuthenticationService, private toastr:ToastrService, private router:ActivatedRoute, private Router:Router) {

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.poid = params.get('poid')
      this._manufacturerService.getPO(this.poid).subscribe(
        res => {
          this.podata=res
          if(this.podata.status!="confirmed"){
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
  showPartDetails(pin){
    for(let items in this.pinarray){
      if(this.pinarray[items]._id == pin){
        this.selectedPart = this.pinarray[items]
      }
    }
  }
  confirmDelivery(){
    this._manufacturerService.confirmDelivery({poid:this.podata._id}).subscribe(
      res => {
        this.toastr.success("Shipment delivered"),
        this.reload()
      },
      err => this.toastr.error("Delivery failed")
    )
  }

  reload() {
    this.Router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.Router.onSameUrlNavigation = 'reload';
    this.Router.navigate(['/manufacturer/po/'+this.poid]);
  }
}