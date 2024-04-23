import { Pipe, PipeTransform } from '@angular/core';
import { Appointment, DoctorData } from '../interfaces/doctor-data';

@Pipe({
  name: 'daySearch',
  standalone: true
})
export class DaySearchPipe implements PipeTransform {

  transform(doctorData: DoctorData[], textSearch: string): DoctorData[] {

 
    if(textSearch!==''){
      return doctorData.filter((doc)=>doc.appointments.map((m)=>m.day).includes(textSearch))
    }else{
      return doctorData
    }
  }

}
