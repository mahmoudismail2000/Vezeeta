import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {Subscription} from 'rxjs';
import {DialogBelonging} from '@costlydeveloper/ngx-awesome-popup';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../core/services/doctor.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss']
})





export class UpdateAppointmentComponent implements OnInit, OnDestroy {
    
    // Dependency Injection of the dialogBelonging in constructor is crucial.
    constructor(@Inject('dialogBelonging') public dialogBelonging: DialogBelonging,private _DoctorService:DoctorService) {}

    private subscriptions: Subscription = new Subscription();
    timeData:any
    timeForm:FormGroup=new FormGroup({
      id:new FormControl(''),
      time:new FormControl('')
    })

    ngOnInit(): void {
        // Check received data and other available features.
        console.log(this.dialogBelonging);
        this.timeData=this.dialogBelonging.customData
        // Timeout emulates async data.
        setTimeout(() => {
            // Close the loader after some data is ready.
            // IDialogEventsController
            this.dialogBelonging.eventsController.closeLoader();
        }, 1000);
    }
    updateAppointment(idElement:HTMLInputElement,timeElement:HTMLInputElement):void
    {
      this.timeForm.value.id=idElement.value
      this.timeForm.value.time=timeElement.value
      console.log(this.timeForm.value);
      this._DoctorService.updateAppointment(this.timeForm.value).subscribe({
        next:(response)=>{
          const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Times !');
          newToastNotification.setMessage('Time Update Successfully !');
  
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
      
     

    }
    close():void
    {
      this.dialogBelonging.eventsController.close();
    }
    ngOnDestroy(): void {
        // Care about memory and close all subscriptions.
        this.subscriptions.unsubscribe();
    }
}
