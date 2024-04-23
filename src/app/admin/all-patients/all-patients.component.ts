import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { patients } from 'src/app/core/interfaces/all-patient';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-all-patients',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss']
})
export class AllPatientsComponent implements OnInit{
  constructor(private _AdminService:AdminService){}
  allPatients:patients[]=[]
  ngOnInit(): void {
    this._AdminService.getAllPatients().subscribe({
      next:(response)=>{
        console.log(response);
        this.allPatients=response
        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
  }

}
