import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorData } from 'src/app/core/interfaces/doctor-data';
import { AdminService } from 'src/app/core/services/admin.service';

import {
  DialogInitializer,
  DialogLayoutDisplay
} from '@costlydeveloper/ngx-awesome-popup';
import { PatientBookComponent } from '../patient-book/patient-book.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SpecializationService } from 'src/app/core/services/specialization.service';
import { PatientService } from 'src/app/core/services/patient.service';
@Component({
  selector: 'app-all-doctors-in-specialize',
  standalone: true,
  imports: [CommonModule,RouterLink,CarouselModule],
  templateUrl: './all-doctors-in-specialize.component.html',
  styleUrls: ['./all-doctors-in-specialize.component.scss']
})
export class AllDoctorsInSpecializeComponent implements OnInit{
  constructor(private _PatientService:PatientService,private _ActivatedRoute:ActivatedRoute,private _Renderer2:Renderer2,private _SpecializationService:SpecializationService){}
  specializeId:any
  specializeName!:string
  allDoctorsInSpecialization:DoctorData[]=[]
  isShow:boolean=false
  appointments: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.specializeId=param.get('id')
        console.log(this.specializeId);
        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })
    this._PatientService.getAllDoctorsInSpecialization(this.specializeId).subscribe({
      next:(response)=>{
        console.log(response);
        this.allDoctorsInSpecialization=response
        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })
    this._SpecializationService.getSpecializationById(this.specializeId).subscribe({
      next:(response)=>{
        
        this.specializeName=response.name
        

      }
    })
  }
  moreAppointments(times:HTMLDivElement,option:HTMLSpanElement,isShowMsg:HTMLDivElement):void
  {
   
    
    if(option.innerText=='More'){
      this._Renderer2.addClass(times,'h-auto')
      this._Renderer2.addClass(isShowMsg,'d-flex')
      this._Renderer2.removeClass(isShowMsg,'d-none')
      console.log(isShowMsg);
      
      option.innerHTML='Less'
      this.isShow=true
    }else{
      this._Renderer2.removeClass(times,'h-auto')
      this._Renderer2.addClass(isShowMsg,'d-none')
      option.innerHTML='More'
      this.isShow=false
    }

  }
  
  booking(day:string,id:number,time:string):void
  {
    
      // Instance of DialogInitializer includes any valid angular component as argument.
      const dialogPopup = new DialogInitializer(PatientBookComponent);
  
      // Any data can be sent to AnyAngularComponent.
      dialogPopup.setCustomData({ appointmentDay: day, appointmentId: id, appointmentTime: time }); // optional
  
      // Exchange some data
      
  
      // Set some configuration.
      dialogPopup.setConfig({
        width: '500px',
        layoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
      });
  
      
  
      // Simply open the popup and observe which button is clicked and,
      // receive optional payload from AnyAngularComponent.
      dialogPopup.openDialog$().subscribe(resp => {
       
      });
    }

}
