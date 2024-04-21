import { AuthService } from '../../core/services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from 'src/app/core/services/admin.service';
import lottie  from 'lottie-web';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _AdminService:AdminService,private _Router:Router){}
  loginErrorsMsg!:string

  @ViewChild('myElement') myElement!: ElementRef;

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  isLoading:boolean=false
  
  

  login():void
  {
    this.isLoading=true
    
    if(this.loginForm.valid){
      this._AuthService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          localStorage.setItem('eToken',response.token)
          this._AuthService.getUserData()
          this.isLoading=false
          
          if(this._AuthService.userData.Role==='Admin'){
            this._Router.navigate(['/dashboard'])
            
          }else{
            this._Router.navigate(['/home'])
          }
          
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading=false
          console.log(err);
          this.loginErrorsMsg=err.error
          
  
        }
      })
    }

  }



 

}
