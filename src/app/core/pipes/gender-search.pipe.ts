import { DoctorData } from './../interfaces/doctor-data';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderSearch',
  standalone: true
})
export class GenderSearchPipe implements PipeTransform {



  transform(doctorData: DoctorData[],textSearch: string): DoctorData[] {
    
      if(textSearch!==''){
        return doctorData.filter((doctor)=>doctor.gender.includes(textSearch));
      }else{
        return doctorData
      }
    
  }

}
