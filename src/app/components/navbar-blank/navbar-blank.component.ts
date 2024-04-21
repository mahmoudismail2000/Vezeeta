import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorData } from 'src/app/core/interfaces/doctor-data';
import { PatientService } from 'src/app/core/services/patient.service';
import { PatientData } from 'src/app/core/interfaces/patient-data';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,ChipModule],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit{
  constructor(private _Router:Router,private _AuthService:AuthService,private _DoctorService:DoctorService,private _PatientService:PatientService){}
  roleOfUser:string=''
  idOfUser!:number
  doctorData:DoctorData={} as DoctorData
  patientData:PatientData={details:{fullName:'',photoPath:''}} as PatientData

  

  
  ngOnInit(): void {
    this._AuthService.getUserData()
    this.roleOfUser=this._AuthService.userData.Role
    if(this._AuthService.userData.Role=='Doctor'){
      this.idOfUser=this._AuthService.userData.DoctorId
      this._DoctorService.getDoctorById(this.idOfUser).subscribe({
        next:(response)=>{
          this.doctorData=response
          console.log(this.doctorData);
          
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          

        }
      })
    }else{
      this.idOfUser=this._AuthService.userData.Id
      this._PatientService.getPatientById(this.idOfUser).subscribe({
        next:(response)=>{
          
          this.patientData=response
          console.log(this.patientData);
         
          

        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          

        }
      })

    }
    console.log(this.roleOfUser);
    console.log(this.idOfUser);
    
  }
  signOut():void
  {
    localStorage.removeItem('eToken')
    this._Router.navigate(['/login'])

  }


}
