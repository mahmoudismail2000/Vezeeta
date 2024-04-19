import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperText',
  standalone: true
})
export class UpperTextPipe implements PipeTransform {

  transform(text: string): string {
    return text.toUpperCase();
  }

}
