import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  baseUrl:string=environment.baseApi

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
