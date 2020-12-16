import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOrder } from '../interfacecs/order.interface';
import { IProduct } from '../interfacecs/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string;
  basket: Subject<Array<IProduct>> = new Subject<Array<IProduct>>()
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }
  addBasket(prod: IProduct): void {
    let localProd: Array<IProduct> = []
    if (localStorage.getItem('basket')) {
      localProd = JSON.parse(localStorage.getItem('basket'))
      if (localProd.some(product => product.id === prod.id)) {
        const i = localProd.findIndex(product => product.id === prod.id)
        localProd[i].count += prod.count;
      }
      else {
        localProd.push(prod)
      }
    }
    else {
      localProd.push(prod)
    }
    localStorage.setItem('basket', JSON.stringify(localProd));
    this.basket.next(localProd)
  }

  getOrders(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }

  postOrders(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.url, order);
  }
}
