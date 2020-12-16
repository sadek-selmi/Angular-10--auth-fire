import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ukrPrice'
})
export class UkrPricePipe implements PipeTransform {

  
  transform(value: string): string {
    if (!value){
      return '';
    }
    return value + ' ₴';
  }


}
