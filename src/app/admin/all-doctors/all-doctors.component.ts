import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllDoctors, Doctors } from 'src/app/core/interfaces/alldoctors';
import { AdminService } from 'src/app/core/services/admin.service';

import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
  ConfirmBoxInitializer
} from '@costlydeveloper/ngx-awesome-popup';




@Component({
  selector: 'app-all-doctors',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxPaginationModule],
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.scss'],
  
})
export class AllDoctorsComponent implements OnInit{
  constructor(private _AdminService:AdminService){}
  doctors:Doctors[]=[]
  pagData:any={} as AllDoctors
  pageNum:number=1

  
  ngOnInit(): void {
    
    this._AdminService.getAllDoctors(this.pageNum).subscribe({
      //read response headers
      next:(response:HttpResponse<any>)=>{
        this.pagData=response.body
        console.log(response);
        console.log(response.headers);
        console.log(response.headers.keys());
        console.log(response.headers.get('pagination'));
        this.doctors=response.body.reverse()
        

      
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
  }

  deleteDoctor(id:number):void
  {
    
    const confirmBox = new ConfirmBoxInitializer();
      confirmBox.setTitle('Are you sure?');
      confirmBox.setMessage('Confirm to delete user: John Doe!');
      confirmBox.setButtonLabels('YES', 'NO');
  
      // Choose layout color type
      confirmBox.setConfig({
        layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
        animationIn: AppearanceAnimation.JELLO,
        animationOut: DisappearanceAnimation.BOUNCE_OUT,
      });
  
      // Simply open the popup and listen which button is clicked
      confirmBox.openConfirmBox$().subscribe(resp => {
        // IConfirmBoxPublicResponse
        if(resp.success){
          
          this._AdminService.deleteDoctor(id).subscribe({
            next:(response)=>{
              const newToastNotification = new ToastNotificationInitializer();
      
              newToastNotification.setTitle('Doctor !');
              newToastNotification.setMessage('Doctor Delete Successfully !')
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
              this.ngOnInit()
            },
            error:(err:HttpErrorResponse)=>{
              console.log(err);
              
            }
          })
  
        }
        console.log('Clicked button response: ', resp);
      });
    }



  
  pageChanged(event:any):void
  {
    console.log(event);
    this.pageNum=event
    this.ngOnInit()
    

  }


  

}
