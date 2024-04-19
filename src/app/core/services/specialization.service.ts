import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  baseUrl:string='https://localhost:7198/api/'

  constructor(private _HttpClient:HttpClient) { }

  getSpecializationByName(specializationsName:string):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Specializations/GetByName?name=${specializationsName}`)
  }
  getAllSpecializations():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Specializations/GetAll')

  }
}
