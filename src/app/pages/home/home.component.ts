import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TopDoctor } from 'src/app/core/interfaces/top-doctor';
import { PatientService } from 'src/app/core/services/patient.service';
import { DoctorData } from 'src/app/core/interfaces/doctor-data';
import {
  DialogLayoutDisplay,
  DialogInitializer,
  ButtonLayoutDisplay,
  ButtonMaker
} from '@costlydeveloper/ngx-awesome-popup';
import { PatientBookComponent } from '../patient-book/patient-book.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _AdminService:AdminService,private _PatientService:PatientService){}
  topDoctors:TopDoctor[]=[]
  allDoctors:DoctorData[]=[]
  numb:number=8
  options:string='More'
  ngOnInit(): void {
    this._AdminService.getTop10Doctors().subscribe({
      next:(response)=>{
        console.log(response);
        this.topDoctors=response
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
    this._PatientService.getAlldoctors().subscribe({
      next:(response)=>{
        console.log(response);
        this.allDoctors=response
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed:700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  topDoctorsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    autoplaySpeed:500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
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
        items: 1
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
  moreAppointments():void
  {
    if(this.options=='More'){
      this.numb=100
      this.options='Less'

    }else{
      this.numb=8
      this.options='More'
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





  




