import { ICategory } from '../interfacecs/category.interface';

export class Category implements ICategory{
    constructor( public id : number | string,
        public name : string,
        ){}
   
}