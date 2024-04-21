import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';
import { ToastrService } from 'ngx-toastr';
import { Specialize } from 'src/app/core/interfaces/specialize';
import { AdminService } from 'src/app/core/services/admin.service';
import { SpecializationService } from 'src/app/core/services/specialization.service';




@Component({
  selector: 'app-add-doctors',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-doctors.component.html',
  styleUrls: ['./add-doctors.component.scss']
})
export class AddDoctorsComponent implements OnInit{
  constructor(private _AdminService:AdminService,private _SpecializationService:SpecializationService){}
  selectedFile:any
  specializations:Specialize[]=[]
  value!:string
  @ViewChildren('inputData') allInput!:QueryList<any>

  addDoctorForm:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    dateOfBirth:new FormControl('',[Validators.required]),
    specializationId:new FormControl('',[Validators.required]) 
  })
  ngOnInit(): void {
    this._SpecializationService.getAllSpecializations().subscribe({
      next:(response)=>{
        console.log(response);
        this.specializations=response
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
  }

  addImageChange(event:any){
    this.selectedFile=event.target.files[0]
  }

  addDoctor():void
  {
    console.log(this.selectedFile);
    
    console.log(this.addDoctorForm.value);
  
    const form= new FormData()
    form.append('firstName',this.addDoctorForm.value.firstName),
    form.append('lastName',this.addDoctorForm.value.lastName),
    form.append('email',this.addDoctorForm.value.email),
    form.append('phone',this.addDoctorForm.value.phone),
    form.append('gender',this.addDoctorForm.value.gender),
    form.append('dateOfBirth',this.addDoctorForm.value.dateOfBirth),
    form.append('specializationId',this.addDoctorForm.value.specializationId),
    form.append('image',this.selectedFile,this.selectedFile.name)
    console.log(form);
    this._AdminService.addDoctor(form).subscribe({
      next:(response)=>{
        console.log(response);
        const newToastNotification = new ToastNotificationInitializer();

          newToastNotification.setTitle('Doctor !');
          newToastNotification.setMessage('Doctor Add Successfully !')
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
        this.allInput.forEach((m)=>{m.nativeElement.value=''})
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })



  }

}
