import { Pipe, PipeTransform } from '@angular/core';
import { DoctorData } from '../interfaces/doctor-data';

@Pipe({
  name: 'feesSearch',
  standalone: true
})
export class FeesSearchPipe implements PipeTransform {

  transform(doctorData:DoctorData[],option:string):DoctorData[] {
    
    if(option=='Less100'){
      return doctorData.filter((doctor)=>doctor.price<=100);
    }else if(option=='from100To200'){
      return doctorData.filter((doctor)=>(100<doctor.price&&doctor.price<200));

    }
    else if(option=='from200To300'){
      return doctorData.filter((doctor)=>(200<doctor.price&&doctor.price<300));

    }
    else if(option=='greater300'){
      return doctorData.filter((doctor)=>doctor.price>=300);

    }
    else{
      return doctorData;
    }
  }

}
