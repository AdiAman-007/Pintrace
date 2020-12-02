import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private _apiUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getDashboardTable(data){
    return this.http.get<any>(`${this._apiUrl}supplierdashboardtable`, data)
  }

  getPO(id){
    return this.http.post<any>(`${this._apiUrl}getpo`, {poid:id})
  }

  createPackage(payload){
    console.log(payload)
    return this.http.post<any>(`${this._apiUrl}createpackage`, payload)
  }

  createShipment(payload){
    return this.http.post<any>(`${this._apiUrl}createshipment`, payload)
  }

  getPins(payload){
    return this.http.post<any>(`${this._apiUrl}getpins`, payload)
  }
}
