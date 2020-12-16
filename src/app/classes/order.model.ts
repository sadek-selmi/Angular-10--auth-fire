import { IOrder } from '../interfacecs/order.interface';

export class Order implements IOrder{
    constructor(
    public id: number | string,
    public name: string,
    public email: string,
    public phone: number,
    public street:string,
    public payWay:string,
    public date: Date){}
}