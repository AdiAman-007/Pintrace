import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';

@Component({
  selector: 'app-createpo',
  templateUrl: './createpo.component.html',
  styleUrls: ['./createpo.component.css']
})


export class CreatepoComponent implements OnInit {
  locationList:Array<string>
  supplierList:Array<string>
  partList:Array<string>
  poHeader:FormGroup
  part:FormGroup
  cart:Array<Object>
  payload:any

  constructor(private formBuilder: FormBuilder, private _manufacturerService:ManufacturerService, private _auth:AuthenticationService, private toastr:ToastrService) {

  }

  ngOnInit(): void {
    //Initialization section
    this.cart = []
    this.payload = {}

    this.poHeader = this.formBuilder.group({
      orderdate: ['', Validators.required],
      deliverlocation: ['', Validators.required],
      supplier: ['', Validators.required],
    });

    this.part = this.formBuilder.group({
      partname:[{value:'', disabled: true},Validators.required],
      quantity:[{value:'', disabled: true},Validators.required],
    })

    this.htmlPopulator()
  }

  savePoHeader(){
    if(this.poHeader.valid){
      let manufacturer = JSON.parse(this._auth.getUser()).org;

      this.payload = {...this.poHeader.value}
      this.payload.manufacturer = manufacturer
      for (let control in this.poHeader.controls) {
        this.poHeader.controls[control].disable();
      }
      this._manufacturerService.getParts({supplier:this.payload.supplier}).subscribe(
        res => this.partList = res,
        err => console.log(err)
      )
      for (let control in this.part.controls) {
        this.part.controls[control].enable();
      }
      console.log(this.payload)
      this.toastr.success('PO Header saved.');
    }
    else{
      console.log('invalid form', this.poHeader.value)
      this.toastr.success('Invalid PO Header.');
    }
  }

  addPart(){
    if(this.part.valid){
      let partDetail:any = this.part.value
      if(this.isNegative(partDetail.quantity)){
        this.toastr.error('Quatity cannot be a -ve value.');
      } else{
        if(this.cart.length != 0){
          if(this.searchCart()){
            this.toastr.error('Part already added.');
          } else this.cart.push(partDetail)
        } else this.cart.push(partDetail)
      }
    }
  }

  searchCart(){
    let found:boolean = false
    for(let items of this.cart){
      if(items['partname'] === this.part.value.partname){
        found = true
      }
    }
    return found
  }

  isNegative(value){
    if(value<0){
      return true
    }
    else return false
  }

  trashPart(part){
    this.cart = this.cart.filter(item => item !== part)
    console.log(this.cart)
  }

  createPO(){
    this.payload.partlist = this.cart
    console.log(this.payload);
    this._manufacturerService.createPO(this.payload).subscribe(
      res =>{
          this.toastr.success('Order created.')
          this.resetForm()
      },
      err => this.toastr.error('Failed to create order.')
    )
  }

  htmlPopulator(){
    this._manufacturerService.getLocation().subscribe(
      res => this.locationList = res,
      err => console.log(err)
    )

    this._manufacturerService.getSuppliers().subscribe(
      res => {
        this.supplierList = res
        console.log(res.status)
      },
      err => console.log(err)
    )
  }

  isEmpty(obj){
    return _.isEmpty(obj)
  }

  resetForm(){
    this.locationList=[]
    this.supplierList=[]
    this.partList=[]
    this.cart=[]
    this.payload={}
    for (let control in this.poHeader.controls) {
      this.poHeader.controls[control].reset();
      this.poHeader.controls[control].enable();
    }
    for (let control in this.part.controls) {
      this.part.controls[control].reset();
      this.part.controls[control].disable();
    }
    this.htmlPopulator()
  }
}
