import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string='https://localhost:7198/api/'
  userData:any;

  constructor(private _HttpClient:HttpClient) { }

  login(userLogin:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'Authentication/Login',userLogin)
    

  }
  patientRegister(patientData:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'Patients/Register',patientData)

  }
  getUserData():void
  {
    if(localStorage.getItem('eToken')){
      let encode:any=localStorage.getItem('eToken')
      let decode:any=jwtDecode(encode)
      this.userData=decode
      console.log(this.userData);
    }

  }

}
