import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from 'rxjs';
import {DialogBelonging} from '@costlydeveloper/ngx-awesome-popup';
import { BookAppointment } from 'src/app/core/interfaces/book-appointment';
import { AdminService } from 'src/app/core/services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Coupon } from 'src/app/core/interfaces/coupon';
import { PatientService } from 'src/app/core/services/patient.service';
import * as moment from 'moment';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
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
    numberOfRequest!:number
    datesOfDay!:string[]
    transformedTime!:string;
    private subscriptions: Subscription = new Subscription();
    bookForm:FormGroup=new FormGroup({
        appointmentTimeId:new FormControl(''),
        discountCode:new FormControl(''),
        appointmentRealTime:new FormControl('')
    })
    

    

    ngOnInit(): void {



        this.bookForm.value.appointmentTimeId=50

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
                console.log(response.length);
                this.numberOfRequest=response.length
               
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

        const dateBook:Date=new Date()
        console.log('Monday',dateBook.getMonth()+1,dateBook.getFullYear());
        this.getDatesForDayName(this.bookData.appointmentDay,dateBook.getMonth()+1,dateBook.getFullYear())
    }
    
    ngOnDestroy(): void {
        // Care about memory and close all subscriptions.
        this.subscriptions.unsubscribe();
    }
    getDatesForDayName(dayName:string, month:number, year:number): Date[] {
        const dates: Date[] = [];
        const startDateOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
        const endDateOfMonth = moment(startDateOfMonth).endOf('month');
        const currentDate = moment(startDateOfMonth);
    
        while (currentDate.isSameOrBefore(endDateOfMonth)) {
          if (currentDate.format('dddd') === dayName) {
            dates.push(currentDate.toDate());
          }
          currentDate.add(1, 'day');
        }
       
        const realDayOfMonth=dates.map((date)=>date.toISOString().slice(0,11)+`${this.transformedTime}`)
        this.datesOfDay=realDayOfMonth
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
        this.bookForm.value.discountCode=discount.value
        this.bookForm.value.appointmentRealTime=realTime.value
        console.log(this.bookForm.value);
        this._PatientService.bookAnAppointment(this.bookForm.value).subscribe({
            next:(response)=>{
                console.log(response);
                

            },error:(err:HttpErrorResponse)=>{
                console.log(err);
                

            }
        })
        
        this.dialogBelonging.eventsController.close();
    }     
      

}
