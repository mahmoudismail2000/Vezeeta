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
  getAllBookings(day:string):Observable<any>
  {
    if(day==''){
      return this._HttpClient.get(this.baseUrl+`Bookings/DoctorGetAll`)
    }else{
      return this._HttpClient.get(this.baseUrl+`Bookings/DoctorGetAll?Day=${day}`)
    }

  }

  confirmCheckUp(id:number):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+`Bookings/ConfirmCheckUp?id=${id}`,{})

  }
  deleteAppointment(timeId:number):Observable<any>
  {
    return this._HttpClient.delete(this.baseUrl+`Appointments/DeleteTime?id=${timeId}`)

  }
  updateAppointment(timeUpdated:object):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+'Appointments/UpdateTime',timeUpdated)

  }
  addAppointment(dayOfAppointment:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'Appointments/Add',{
      days:[
        dayOfAppointment
      ]
    })
  }
}
