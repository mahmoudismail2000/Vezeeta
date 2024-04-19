import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Coupon } from 'src/app/core/interfaces/coupon';
import { SearchCouponsPipe } from 'src/app/core/pipes/searchCoupons.pipe';
import { UpperTextPipe } from 'src/app/core/pipes/upper-text.pipe';
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
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,UpperTextPipe,SearchCouponsPipe],
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],

})
export class CouponsComponent implements OnInit{
  constructor(private _AdminService:AdminService,private _ToastrService:ToastrService){}

  allCoupons:Coupon[]=[]
  isUpdate:boolean=false
  isAdd:boolean=true
  updateID!:number;
  code:string='';
  req:string='';
  val:string='';
  deleteId!:number
  searchText:string=''
  searchPlaceholder:string='Search...'
  @ViewChildren('inputAdd') inputsAdd!:QueryList<any>
  @ViewChildren('inputUpd') inputsUpd!:QueryList<any>

  addCouponForm:FormGroup=new FormGroup({
    discountCode:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(6)]),
    numOfRequests:new FormControl('',[Validators.required]),
    value:new FormControl('',[Validators.required])

  })
  upDateCouponForm:FormGroup=new FormGroup({
    discountCode:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(6)]),
    numOfRequests:new FormControl('',[Validators.required]),
    value:new FormControl('',[Validators.required])

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
  }

  addCoupon():void
  {
    this.addCouponForm.value.discountType="Percentage"
   if(this.addCouponForm.valid){
    
    console.log(this.addCouponForm.value);
    
    this._AdminService.addCoupon(this.addCouponForm.value).subscribe({
      next:(response)=>{
        if(response){
          this.inputsAdd.forEach((m)=>m.nativeElement.value='')
          this.ngOnInit()
          const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Coupon !');
          newToastNotification.setMessage('Coupon Add Successfully !')
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
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
        
        

      }
    })
   }else{
    this.addCouponForm.markAllAsTouched()
    console.log(this.addCouponForm.value);
    
    
    
   }

  }
  
  deleteCoupon(id:number):void
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
          this._AdminService.deleteCoupon(id).subscribe({
            next:(response)=>{
              console.log(response);
              if(response==null){
                const newToastNotification = new ToastNotificationInitializer();
      
                newToastNotification.setTitle('Coupon !');
                newToastNotification.setMessage('Coupon Delete Successfully !')
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
              }
              
            },
            error:(err:HttpErrorResponse)=>{
              console.log(err);
              
            }
          })
  
        }
        console.log('Clicked button response: ', resp);
      });
    }
    
  
  deactivateCoupon(id:number):void
  {
    this._AdminService.deActiveCoupon(id).subscribe({
      next:(response)=>{
        console.log(response);
        if(response==null){
          const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Coupon !');
          newToastNotification.setMessage('Coupon DeActive Successfully !')
          // Choose layout color type
          newToastNotification.setConfig({
      autoCloseDelay: 2500, // optional
      textPosition: 'right', // optional
      layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
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
        }
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })

  }
  updateCoupon():void
  {
    console.log(this.upDateCouponForm.value);
    this.upDateCouponForm.value.discountType="Percentage"
    this.upDateCouponForm.value.id=this.updateID
    
    
    if(this.isUpdate){
      this._AdminService.updateCoupon(this.upDateCouponForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.inputsUpd.forEach((m)=>m.nativeElement.value='')
          this.inputsAdd.forEach((m)=>m.nativeElement.value='')
          this.isAdd=true
          this.isUpdate=false
          const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Coupon !');
          newToastNotification.setMessage('Coupon Update Successfully !')
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

  }
  update1Step(id:number):void
  {
    this.isAdd=false
    this.isUpdate=true
    this.updateID=id
    const couponSelected:any=this.allCoupons.filter((coupon)=>coupon.id==this.updateID)
    console.log(couponSelected);
    this.code=couponSelected[0].discountCode
    this.req=couponSelected[0].numOfRequests
    this.val=couponSelected[0].value
    window.scrollTo(0,0)


    
      
  }


  searchEngine(text:string):void
  {
    let arrSearch=this.allCoupons.filter((coupon)=>coupon.discountCode.toLowerCase().includes(text.toLowerCase()))
    this.searchPlaceholder=arrSearch[0].discountCode
  }

  

}

