import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-viewfg',
  templateUrl: './viewfg.component.html',
  styleUrls: ['./viewfg.component.css']
})
export class ViewfgComponent implements OnInit {
  productid;
  productdata;
  pinarray;
  selectedPart:any = {};
  constructor(private _manufacturerService:ManufacturerService, private _supplierService:SupplierService, private _auth:AuthenticationService, private toastr:ToastrService, private router:ActivatedRoute, private Router:Router) {

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.productid = params.get('productid')
      this._manufacturerService.getFG(this.productid).subscribe(
        res => {
          this.productdata=res
        },
        err => this.toastr.error("Failed to load po data")
      )
    });
  }

}
