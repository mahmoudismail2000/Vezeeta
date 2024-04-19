import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecializationService } from 'src/app/core/services/specialization.service';
import { Specialize } from 'src/app/core/interfaces/specialize';
import { FormsModule } from '@angular/forms';
import { SearchSpecialtiesPipe } from 'src/app/core/pipes/seach-specialties.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchSpecialtiesPipe,RouterLink],
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss']
})
export class SpecialtiesComponent implements OnInit{
  constructor(private _SpecializationService:SpecializationService){}
  specialties:Specialize[]=[]
  textSearch:string=''
  ngOnInit(): void {
    this._SpecializationService.getAllSpecializations().subscribe({
      next:(response)=>{
        console.log(response);
        this.specialties=response
      },
      error:(err)=>{
        console.log(err);
        
        

      }
    })
  }

}
