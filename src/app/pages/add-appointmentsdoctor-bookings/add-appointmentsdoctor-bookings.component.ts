import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AppearanceAnimation,
  DialogInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-add-appointmentsdoctor-bookings',
  standalone: true,
  imports: [CommonModule,OrderListModule,ReactiveFormsModule],
  templateUrl: './add-appointmentsdoctor-bookings.component.html',
  styleUrls: ['./add-appointmentsdoctor-bookings.component.scss']
})
export class AddAppointmentsdoctorBookingsComponent implements OnInit{
  constructor(@Inject('dialogBelonging') public dialogBelonging: DialogBelonging,private _DoctorService:DoctorService) {}
  addAppointmentForm:FormGroup=new FormGroup({
    day:new FormControl(''),
    times:new FormControl('',[Validators.pattern(/^[0-9][0-2]?:[0-5][0-9] (pm|am)$/)])
  })
  times:string[]=[]
  msgTimeFounded!:string
  ngOnInit(): void {
    console.log(this.dialogBelonging);

    setTimeout(() => {
      // Close the loader after some data is ready.
      // IDialogEventsController
      this.dialogBelonging.eventsController.closeLoader();
  }, 1000);
  }
  addAppointment():void
  {
    this.addAppointmentForm.value.times=this.times
    console.log(this.addAppointmentForm.value);
    this._DoctorService.addAppointment(this.addAppointmentForm.value).subscribe({
      next:(response)=>{
        
        this.times=[]
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle('Appointment !');
        newToastNotification.setMessage('Appointment Add Successfully !');

        // Choose layout color type
        newToastNotification.setConfig({
        autoCloseDelay: 2500, // optional
        textPosition: 'center', // optional
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
        this.dialogBelonging.eventsController.close();
        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })
    
    // this.dialogBelonging.eventsController.close();

  }
  addTime(time:HTMLInputElement):void
  {
    if(this.times.includes(time.value)){
      this.msgTimeFounded='This Time already Exists'
    }
    else{
        if(this.addAppointmentForm.get('times')?.valid){
          this.times.push(time.value)
          console.log(this.times);
      
        }
      
    }
  }
  close():void
  {
    this.dialogBelonging.eventsController.close();

  }


}
