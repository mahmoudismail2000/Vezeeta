import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from 'src/app/core/services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingInAllPatient } from 'src/app/core/interfaces/booking-in-all';
import { TableModule } from 'primeng/table';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';
import {
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit{
  allBookings:BookingInAllPatient[]=[]
  constructor(private _PatientService:PatientService){}
  ngOnInit(): void {
    this._PatientService.getAllBookings().subscribe({
      next:(response)=>{
        console.log(response);
        this.allBookings=response
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })
  }

  openConfirmBox(id:number) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Cancel Appointment ?');
    newConfirmBox.setMessage('Are You Sure Cancelled ?');

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.JELLO, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.FLIP_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional 
    });

    newConfirmBox.setButtonLabels('Cancel', 'Close');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      console.log(resp.clickedButtonID);
      
      if(resp.clickedButtonID=='cancel'){
        this._PatientService.cancelAppointment(id).subscribe({
          next:(response)=>{
            const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Booking !');
          newToastNotification.setMessage('Booking cancelled !')
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
