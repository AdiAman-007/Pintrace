import { Component, OnInit} from '@angular/core';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createfg',
  templateUrl: './createfg.component.html',
  styleUrls: ['./createfg.component.css']
})
export class CreatefgComponent implements OnInit {
  productCodeList:[];
  prductCode = new FormControl();
  proudctTemplate:any;

  constructor(private _manufacturerService:ManufacturerService, private formBuilder: FormBuilder, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this._manufacturerService.getProductCodes().subscribe(
      res => this.productCodeList = res,
      err => console.log(err)
    )
  }

  importTemplate(){
    console.log(this.prductCode.value)
    this._manufacturerService.getProductTemplate({productcode:this.prductCode.value}).subscribe(
      res => this.proudctTemplate = res,
      err => this.toastr.error("Template import failed")
    )
  }

  createFG(){
    console.log(this.proudctTemplate)
    this._manufacturerService.createFG(this.proudctTemplate).subscribe(
      res => {
        this.toastr.success("Product created")
        this.router.navigate(['/manufacturer/dashboard'])
      },
      err => this.toastr.error("Prduct creation failed")
    )
  }

}
