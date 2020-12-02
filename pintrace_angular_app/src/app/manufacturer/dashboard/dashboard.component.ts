import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  figureData:any
  tableData:any
  productTableData:any
  searchText1:any
  searchText2:any
  searchText3:any
  p: number = 1;
  itemsPerPartPage = 10;
  itemsPerProductPage =10;
  p2:number = 1;

  constructor(private _manufacturerService:ManufacturerService, private toastr:ToastrService, private router:Router) { 

  }

  ngOnInit(): void {
    this._manufacturerService.getFigureData().subscribe(
      res=> this.figureData = res,
      err => this.toastr.error('Failed to load dashboard data')
    )

    this._manufacturerService.getDashboardTable().subscribe(
      res => this.tableData = res,
      err => this.toastr.error("Failed to load dashboard data")
    )

    this._manufacturerService.getProductTable().subscribe(
      res => this.productTableData = res,
      err => this.toastr.error("Failed to load dashboard data")
    )
  }

  createpo(){
    this.router.navigate(['/manufacturer/createpo'])
  }

  createfg(){
    this.router.navigate(['/manufacturer/createfg']) 
  }

  routeToPO(data){
    this.router.navigate(['/manufacturer/po',data._id])
  }

  routeToFG(data){
    this.router.navigate(['/manufacturer/fg',data.productid])
  }

}
