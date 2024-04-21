import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string=environment.baseApi
  getDoctorById(id:number):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Doctors/GetById/${id}`)

  }
}
