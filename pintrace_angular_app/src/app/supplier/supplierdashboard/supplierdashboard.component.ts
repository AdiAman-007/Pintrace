import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-supplierdashboard',
  templateUrl: './supplierdashboard.component.html',
  styleUrls: ['./supplierdashboard.component.css']
})
export class SupplierdashboardComponent implements OnInit {
  figureData:any
  tableData:any
  searchText1:any
  searchText2:any
  p: number = 1;
  itemsPerPage = 20;

  constructor(private _supplierService:SupplierService, private toastr:ToastrService, private router:Router) { 
  }

  ngOnInit(): void {
    let data
    this._supplierService.getDashboardTable({token:localStorage.getItem('token')}).subscribe(
      res => this.tableData = res,
      err => this.toastr.error("Failed to load dashboard data")
    )
  }
  routeToPO(data){
    this.router.navigate(['/supplier/po',data._id])
  }
}
