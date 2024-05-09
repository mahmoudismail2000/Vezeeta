import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/core/services/admin.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule,NgxChartsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  
  constructor(private _AdminService:AdminService){}
  

  
  numOfDoctors!:number;
  numOfPatients!:number;
  numOfRequests!:number;
  search:string='last24hours'
  specializationsChart:any[]=[]
  DoctorsChart:any[]=[]



  ngOnInit(): void {
    this._AdminService.getNumOfDoctors(this.search).subscribe({
      next:(response)=>{
        console.log(response);
        this.numOfDoctors=response
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    this._AdminService.getNumOfPatients(this.search).subscribe({
      next:(response)=>{
        console.log(response);
        this.numOfPatients=response
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    this._AdminService.getNumOfRequests(this.search).subscribe({
      next:(response)=>{
        
        this.numOfRequests=response.numOfRequests
        console.log(this.numOfRequests);
        



      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    this._AdminService.getTop10Doctors().subscribe({
      next:(response)=>{
        console.log(response);
        let arrMapped:any[]=[]
        for(let i=0;i<response.length;i++){
          response[i]={
            name:response[i].fullName,
            value:response[i].num
          }
          arrMapped.push(response[i])
        }
        this.DoctorsChart=arrMapped
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    this._AdminService.getTop5Specializations().subscribe({
      next:(response)=>{
        console.log(response);
        let arrMapped:any[]=[]
        for(let i=0;i<response.length;i++){
          response[i]={
            name:response[i].fullName,
            value:response[i].num
          }
          arrMapped.push(response[i])

        }
        this.specializationsChart=arrMapped
        
        
      
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    
  }

  getDurationTime(event:any):void
  {
    this.search=event.target.value
    this.ngOnInit()
  }
  

}
