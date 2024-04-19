import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDoctorService {

  constructor(private _HttpClient:HttpClient) { }

  addDoctor(doctor:object):Observable<any>
  {
   return this ._HttpClient.post('https://localhost:7198/api/Doctors/Add',doctor,{
      headers:{
        Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW5AdmV6ZWV0YS5jb20iLCJqdGkiOiJlMDBlZjgxNi1iYzE4LTQyNGItODI0ZC1lZmIwMzVkMDZmZTkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcxMDc5NzUxNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE5OCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.hgD2RjeMkpfv4AT4O6nFOStG93ToA_hDVPF9AOMGtpU',
        
      }
    })

  }
}
