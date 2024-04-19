import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router){}

  selectedFile:any;
  imgUrl:any;
  formData!:any;

  registerForm:FormGroup=this._FormBuilder.group({
    firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    lastName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    gender:['',[Validators.required]],
    dateOfBirth:['',[Validators.required]],
    password:['',[Validators.required,Validators.pattern(/^[A-Z]{1,2}[a-z-0-9]{1,50}[!@#$%^&*+\/?|\\]([a-z-0-9]{1,50})?$/)]],
    rePassword:[''],
    
  },{validators:[this.confirmPassword]} as FormControlOptions)
 

  onFileChanged(event:any):void
  {
    this.selectedFile=event.target.files[0]
    console.log(this.selectedFile)
    const reader=new FileReader()
    reader.readAsDataURL(this.selectedFile)
    console.log(reader);
    reader.onload=()=>{
      this.imgUrl=reader.result
      console.log(this.imgUrl);
      
    }
    

  }

  confirmPassword(group:FormGroup):void
  {
    const password=group.get('password')
    const rePassword=group.get('rePassword')
    if(rePassword?.value==null){
      
      rePassword?.setErrors({required:true})
    }else if(password?.value!==rePassword?.value){
      rePassword?.setErrors({misMatch:true})
      

    }

  }

  
  register():void
  {
    console.log(this.registerForm);
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    const formData=new FormData()
    formData.append('firstName',this.registerForm.value.firstName)
    formData.append('lastName',this.registerForm.value.lastName)
    formData.append('email',this.registerForm.value.email)
    formData.append('phone',this.registerForm.value.phone)
    formData.append('gender',this.registerForm.value.gender)
    formData.append('dateOfBirth',this.registerForm.value.dateOfBirth)
    formData.append('password',this.registerForm.value.password)
    formData.append('image',this.selectedFile,this.selectedFile.name)
    this._AuthService.patientRegister(formData).subscribe({
      next:(response)=>{
        console.log(response);
        if(response!=null){
          this._Router.navigate(['/login'])

        }
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        

      }
    })

  }
    }
  
}
