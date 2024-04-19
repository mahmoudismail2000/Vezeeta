import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctors } from 'src/app/core/interfaces/alldoctors';
import { AdminService } from 'src/app/core/services/admin.service';
import { ImageModule } from 'primeng/image';



@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule,ImageModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _AdminService:AdminService){}
  doctorId:any
  doctorDetails:Doctors={} as Doctors
  ahmed:string='sjkh'
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(response)=>{
        console.log(response.get('id'));
        this.doctorId=response.get('id')
        this._AdminService.getDoctorById(this.doctorId).subscribe({
          next:(response)=>{
            console.log(response);
            this.doctorDetails=response
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err);
            

          }
        })
        
      }
    })
  }

}
