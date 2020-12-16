export interface IOrder{
    id: number | string;
    name: string;
    email: string;
    phone: number;
    street:string;
    payWay:string;
    date: Date;
}