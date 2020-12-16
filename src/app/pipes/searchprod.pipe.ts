import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfacecs/product.interface';

@Pipe({
  name: 'searchprod'
})
export class SearchprodPipe implements PipeTransform {

  transform(value: Array<IProduct>, field:string): Array<IProduct> {
    if(!value){
      return value
    }
    if(!field){
      return value
    }
    return value.filter(prod => prod.category.name.toLocaleLowerCase().includes(field) );
    }
}
