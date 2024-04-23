import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AppearanceAnimation,
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum
} from '@costlydeveloper/ngx-awesome-popup';
import { TableModule } from 'primeng/table';
import { BookingInAllDoctor } from 'src/app/core/interfaces/booking-in-all-doctor';
import { DoctorService } from 'src/app/core/services/doctor.service';
@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule,TableModule,FormsModule],
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{
  constructor(private _DoctorService:DoctorService,private _ActivatedRoute:ActivatedRoute){}
  allBookings:BookingInAllDoctor[]=[]
  doctorId!:any
  allDaysForDoctor:string[]=[]
  daySearch:string='';
  ngOnInit(): void {
    this._DoctorService.getAllBookings(this.daySearch).subscribe({
      next:(response)=>{
        console.log(response);
        this.allBookings=response
        

      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        console.log(param.get('id'));
        this.doctorId=param.get('id')
      }
    })
    this._DoctorService.getDoctorById(this.doctorId).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.allDaysForDoctor=response.appointments.map((days:any)=>days.day)
        console.log(this.allDaysForDoctor[0]);
        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })
  }
  searchByDay(){
    this.ngOnInit()
    
  }
  

  openConfirmBox(id:number) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Confirm Appointment ?');
    newConfirmBox.setMessage('Are You Sure Confirm Checkup Appointment ?');

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.JELLO, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.FLIP_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional 
    });

    newConfirmBox.setButtonLabels('Confirm Checkup', 'Close');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      console.log(resp.clickedButtonID);
      
      if(resp.clickedButtonID=='confirm checkup'){
        this._DoctorService.confirmCheckUp(id).subscribe({
          next:(response)=>{
            const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Booking !');
          newToastNotification.setMessage('Booking Confirmation Successfully !')
          // Choose layout color type
          newToastNotification.setConfig({
      autoCloseDelay: 2500, // optional
      textPosition: 'right', // optional
      layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.NONE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.STANDARD, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.ELASTIC, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.SLIDE_OUT_RIGHT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
       // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      toastPosition: ToastPositionEnum.TOP_RIGHT,
          });
          // Simply open the popup
          newToastNotification.openToastNotification$();
          this.ngOnInit()
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err);
            

          }
        })
      }
    });
}
}
