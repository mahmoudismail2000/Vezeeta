import { Component,Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {Subscription} from 'rxjs';
import {DialogBelonging} from '@costlydeveloper/ngx-awesome-popup';
import { BookAppointment } from 'src/app/core/interfaces/book-appointment';
import { AdminService } from 'src/app/core/services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Coupon } from 'src/app/core/interfaces/coupon';
import { PatientService } from 'src/app/core/services/patient.service';

import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { BookingInAllPatient } from 'src/app/core/interfaces/booking-in-all';
import {
    AppearanceAnimation,
    DialogLayoutDisplay,
    DisappearanceAnimation,
    ToastNotificationInitializer,
    ToastPositionEnum,
    ToastProgressBarEnum,
    ToastUserViewTypeEnum,
  } from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-patient-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './patient-book.component.html',
  styleUrls: ['./patient-book.component.scss']
})
export class PatientBookComponent {

    // Dependency Injection of the dialogBelonging in constructor is crucial.
    constructor(@Inject('dialogBelonging') public dialogBelonging: DialogBelonging,private _AdminService:AdminService,private _PatientService:PatientService) {}


    
    bookData:BookAppointment={} as BookAppointment
    allCoupons:Coupon[]=[]
    allPatientBookings:BookingInAllPatient[]=[]
    numberOfRequest!:number
    datesOfDay!:string[]
    transformedTime!:string;
    
    bookForm:FormGroup=new FormGroup({
        appointmentTimeId:new FormControl(''),
        appointmentRealTime:new FormControl('')
    })
    

    

    ngOnInit(): void {


        this._AdminService.getAllCoupons().subscribe({
            next:(response)=>{
                console.log(response);
                this.allCoupons=response
            },
            error:(err:HttpErrorResponse)=>{
                console.log(err);
                

            }
        })
        this._PatientService.getAllBookings().subscribe({
            next:(response)=>{
                this.allPatientBookings=response
                let getCompletedRequests=this.allPatientBookings.filter((book)=>book.bookingStatus.includes('Completed'))
                this.numberOfRequest=getCompletedRequests.length
                console.log( this.numberOfRequest);
                
                
               
            },
            error:(err:HttpErrorResponse)=>{
                console.log(err);
                

            }
        })
        // Check received data and other available features.
        console.log(this.dialogBelonging.customData);
        this.bookData=this.dialogBelonging.customData
         // Check received data and other available features.
         console.log(this.dialogBelonging);
        
         
        
        // Timeout emulates async data.
        setTimeout(() => {
            // Close the loader after some data is ready.
            // IDialogEventsController
            this.dialogBelonging.eventsController.closeLoader();
        }, 1000);

        const timeString = this.bookData.appointmentTime.slice(0,4); // Input time string
        this.transformedTime = this.transformTimeFormat(timeString);
        this.getAllDatesForDayName(this.bookData.appointmentDay)
        
    }
    
    
    getAllDatesForDayName(dayName: string): Date[] {
        const currentDate = new Date();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Get total days in current month
        const daysInNextMonth= new Date(currentDate.getFullYear(),currentDate.getMonth()+2,0).getDate(); // Get total days in next month
      
        
        
        const dates: Date[] = [];
    
        // Iterate over each date in the current month
        for (let day = 1; day <= daysInMonth+daysInNextMonth; day++) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);   // Get date for day
          
          if (date.toLocaleDateString('en', { weekday: 'long' }) === dayName) {
            dates.push(date); // Add the date if its day name matches the desired day name
          }
        }
        const datePipe:any=new DatePipe('en-us')
        const realDayOfMonth=dates.map((date)=>datePipe.transform(date,'yyyy-MM-dd')+'T'+`${this.transformedTime}`)
        this.datesOfDay=realDayOfMonth.filter((date)=>date>datePipe.transform(currentDate,'yyyy-MM-dd'))
        console.log(this.datesOfDay);
        
        return dates;
      }
      
    transformTimeFormat(timeString: string): string {
        const [hourStr, minuteStr] = timeString.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        // Adjust hour for PM times (e.g., add 12 hours)
        if (hour < 12) {
          hour += 12;
        }
        // Convert hour to string with leading zero if needed
        const hourFormatted = hour.toString().padStart(2, '0');
        console.log(`${hourFormatted}:${minuteStr}`);
        
    
        return `${hourFormatted}:${minuteStr}`;
      }
    addAppointment(appId:HTMLInputElement,discount:HTMLSelectElement,realTime:HTMLSelectElement):void
    {
        this.bookForm.value.appointmentTimeId=appId.value
        if(discount.value!=='Select Coupon'){
            this.bookForm.value.discountCode=discount.value
        }
        this.bookForm.value.appointmentRealTime=realTime.value
        console.log(this.bookForm.value);
        this._PatientService.bookAnAppointment(this.bookForm.value).subscribe({
            next:(response)=>{
                console.log(response);
                
                if(response){
                    const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Booking !');
          newToastNotification.setMessage('Booking Successfully !')
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

                }
                

            },error:(err:HttpErrorResponse)=>{
                console.log(err);
                const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Booking !');
          newToastNotification.setMessage(`${err.error}`)
          // Choose layout color type
          newToastNotification.setConfig({
      autoCloseDelay: 2500, // optional
      textPosition: 'right', // optional
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

            }
        })
        
        this.dialogBelonging.eventsController.close();
    }   
    
    closeBooking():void
    {
        this.dialogBelonging.eventsController.close();
    }
      

}
