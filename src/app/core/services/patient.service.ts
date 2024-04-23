import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string=environment.baseApi
  getPatientById(id:number):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+`Patients/GetById/${id}`)
  }
  getAlldoctors():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Doctors/PatientGetAll?PageSize=100')

  }
  getAllBookings():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+'Bookings/PatientGetAll')

  }

  bookAnAppointment(bookData:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'Bookings/Book',bookData)

  }
  cancelAppointment(id:number):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+`Bookings/Cancel?id=${id}`,{})

  }
  getAllDoctorsInSpecialization(id:number):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}Doctors/PatientGetAll?SpecializeId=${id}`)

  }

}
