import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  constructor(private _AdminService:AdminService){}

  numOfDoctors!:number;
  numOfPatients!:number;
  numOfRequests!:number;
  search:string='last24hours'



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
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    this._AdminService.getTop5Specializations().subscribe({
      next:(response)=>{
        console.log(response);
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
