import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private _apiUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getLocation(){
    return this.http.get<any>(`${this._apiUrl}getlocation`)
  }

  getSuppliers(){
    return this.http.get<any>(`${this._apiUrl}getsuppliers`)
  }

  getParts(payload){
    return this.http.post<any>(`${this._apiUrl}getparts`, payload)
  }

  createPO(payload){
    return this.http.post<any>(`${this._apiUrl}createpo`, payload)
  }

  getFigureData(){
    return this.http.get<any>(`${this._apiUrl}carddata`)
  }

  getDashboardTable(){
    return this.http.get<any>(`${this._apiUrl}dashboardtable`)
  }

  getPO(id){
    return this.http.post<any>(`${this._apiUrl}getpo`, {poid:id})
  }

  confirmDelivery(payload){
    return this.http.post<any>(`${this._apiUrl}confirmdelivery`, payload)
  }

  getProductCodes(){
    return this.http.get<any>(`${this._apiUrl}getproductcode`)
  }

  getProductTemplate(payload){
    return this.http.post<any>(`${this._apiUrl}getproducttemplate`, payload)
  }

  createFG(payload){
    return this.http.post<any>(`${this._apiUrl}createfg`, payload)
  }

  getProductTable(){
    return this.http.get<any>(`${this._apiUrl}producttable`)
  }

  getFG(id){
    return this.http.post<any>(`${this._apiUrl}getfg`, {productid:id})
  }
}
