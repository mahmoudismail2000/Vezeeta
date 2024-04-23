import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DialogInitializer,
  DialogLayoutDisplay
} from '@costlydeveloper/ngx-awesome-popup';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DoctorData } from 'src/app/core/interfaces/doctor-data';
import { TopDoctor } from 'src/app/core/interfaces/top-doctor';
import { AdminService } from 'src/app/core/services/admin.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PatientBookComponent } from '../patient-book/patient-book.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _AdminService:AdminService,private _PatientService:PatientService,private _Renderer2:Renderer2){}
  topDoctors:TopDoctor[]=[]
  ngOnInit(): void {

    this._AdminService.getTop10Doctors().subscribe({
      next:(response)=>{
        console.log(response);
        this.topDoctors=response
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })

  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed:700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  topDoctorsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    autoplaySpeed:500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

 

  }





  




