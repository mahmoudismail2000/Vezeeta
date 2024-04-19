import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutTextPipe implements PipeTransform {

  transform(text:string, endIndex:number): unknown {
    return text.split(' ').splice(0,endIndex).join(' ');
  }

}
