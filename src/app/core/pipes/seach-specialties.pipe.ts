import { Pipe, PipeTransform } from '@angular/core';
import { Specialize } from '../interfaces/specialize';

@Pipe({
  name: 'searchSpecialties',
  standalone: true
})
export class SearchSpecialtiesPipe implements PipeTransform {

  transform(list: Specialize[],text: string): Specialize[] {
    return list.filter((specialize)=>specialize.name.toLowerCase().includes(text.toLowerCase()));
  }

}
