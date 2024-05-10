import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { OrderListModule } from 'primeng/orderlist';
import { AdminService } from 'src/app/core/services/admin.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { UpdateAppointmentComponent } from 'src/app/pages/update-appointment/update-appointment.component';
import { AddAppointmentsdoctorBookingsComponent } from './../add-appointmentsdoctor-bookings/add-appointmentsdoctor-bookings.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule,OrderListModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit{
  constructor(private _AdminService:AdminService,private _ActivatedRoute:ActivatedRoute,private _DoctorService:DoctorService){}
  doctorId!:any
  doctorDays!:any[]
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        param.get('id')
        this.doctorId=param.get('id')
        
        

      }
    })
    this._AdminService.getDoctorById(this.doctorId).subscribe({
      next:(response)=>{
        
        this.doctorDays=response.appointments
        

      }
    })
    
  }
  deleteTime(id:number):void
  {
    this._DoctorService.deleteAppointment(id).subscribe({
      next:(response)=>{
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle('Times !');
        newToastNotification.setMessage('Time Delete Successfully !');

        // Choose layout color type
        newToastNotification.setConfig({
        autoCloseDelay: 2500, // optional
        textPosition: 'center', // optional
        layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
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
    this.ngOnInit()
    

  }
  updateTime(id:number,time:string):void
  {
    const dialogPopup = new DialogInitializer(UpdateAppointmentComponent);

    // Any data can be sent to AnyAngularComponent.
    dialogPopup.setCustomData({ id: id, time: time}); // optional
    // Set some configuration.
    dialogPopup.setConfig({
      width: '500px',
      layoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
    });
    
    // Simply open the popup and observe which button is clicked and,
    // receive optional payload from AnyAngularComponent.
    dialogPopup.openDialog$().subscribe(resp => {
      this.ngOnInit()
      

    });

  }
  addAppointment():void
  {
    const dialogPopup = new DialogInitializer(AddAppointmentsdoctorBookingsComponent);
    dialogPopup.setCustomData({ name: 'Jean-Luc', surname: 'Picard', id: 1 }); 
    dialogPopup.setConfig({
      width: '700px',
      layoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
    });
    dialogPopup.openDialog$().subscribe(resp => {
      this.ngOnInit()
    });

  }
}
