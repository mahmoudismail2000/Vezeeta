import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string=environment.baseApi

  

  getAllDoctors(pageNum:number):Observable<any>
  {
    //{observe: 'response'} to read response header
    return this._HttpClient.get(`${this.baseUrl}Doctors/AdminGetAll?PageNumber=${pageNum}&PageSize=12`,{observe: 'response'})

  }
  getAllPatients():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Patients/GetAll')

  }

  getNumOfDoctors(search:string):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Dashboard/NumOfDoctors?search=${search}`)

  }
  getNumOfPatients(search:string):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Dashboard/NumOfPatients?search=${search}`)

  }
  getNumOfRequests(search:string):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Dashboard/NumOfRequests?search=${search}`)

  }
  getTop5Specializations():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Dashboard/Top5Specializations')

  }
  getTop10Doctors():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Dashboard/Top10Doctors')

  }

  deleteDoctor(id:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseUrl+`Doctors/Delete/${id}`)

  }

  getDoctorById(id:any):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Doctors/GetById/${id}`)

  }

  addDoctor(doctor:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'Doctors/Add',doctor)

  }
  editDoctorData(doctorChanges:object):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+'Doctors/Edit',doctorChanges)

  }

  addCoupon(coupon:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'Coupons/Add',coupon)

  }

  updateCoupon(couponUpdated:object):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+'Coupons/Update',couponUpdated)

  }
  deActiveCoupon(idCoupon:number):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+`Coupons/Deactivate/${idCoupon}`,{
      id:idCoupon
    })
  }
  deleteCoupon(id:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseUrl+`Coupons/Delete/${id}`)

  }

  getAllCoupons():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Coupons/GetAll')

  }

  

}
