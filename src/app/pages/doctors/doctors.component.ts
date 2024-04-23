import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
  DialogInitializer,
  DialogLayoutDisplay
} from '@costlydeveloper/ngx-awesome-popup';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DoctorData } from 'src/app/core/interfaces/doctor-data';
import { PatientService } from 'src/app/core/services/patient.service';
import { PatientBookComponent } from '../patient-book/patient-book.component';
import { FormsModule } from '@angular/forms';
import { GenderSearchPipe } from 'src/app/core/pipes/gender-search.pipe';
import { FeesSearchPipe } from 'src/app/core/pipes/fees-search.pipe';
import { DaySearchPipe } from 'src/app/core/pipes/day-seach.pipe';
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule,RouterLink,CarouselModule,FormsModule,GenderSearchPipe,FeesSearchPipe,DaySearchPipe],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit{
  constructor(private _PatientService:PatientService,private _Renderer2:Renderer2){}
  allDoctors:DoctorData[]=[]
  isShow:boolean=false
  genderSearch:string=''
  feesSearch:string=''
  daySearch:string=''
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
    this._PatientService.getAlldoctors().subscribe({
      next:(response)=>{
        console.log(response);
        this.allDoctors=response
        // console.log(
        //   this.allDoctors.filter((doc)=>doc.appointments.map((m)=>m.day).includes('Friday'))
        // );
      },
      error:(err)=>{
        console.log(err);
        

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
