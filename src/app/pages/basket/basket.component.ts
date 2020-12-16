import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/classes/order.model';
import { IOrder } from 'src/app/interfacecs/order.interface';
import { IProduct } from 'src/app/interfacecs/product.interface';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  modalRef: BsModalRef;
  totalPrice = 0;
  basket: Array<IProduct> = [];
  order: Array<IOrder> = [];

  userName: string = '';
  userEmail: string = '';
  userPhone: number = null;
  userStreet: string = '';
  userPay: string = '';

  constructor(private orderService: OrderService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getLocalProducts();
    this.getOrder();
  }
  private getLocalProducts(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
    }

  }
  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0)
  }

  productCount(prod: IProduct, status: boolean): void {
    if (status) {
      prod.count++;
    }
    else {
      if (prod.count > 1) {
        prod.count--;
      }
    }
    this.totalPrice = this.getTotal(this.basket);
    this.orderService.basket.next(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket))
  }
  removeProd(prod: IProduct) {
    if (confirm('Are you sure?')) {
      const index = this.basket.findIndex(product => product.id === prod.id);
      this.basket.splice(index, 1)
      this.totalPrice = this.getTotal(this.basket);
      this.orderService.basket.next(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getOrder(): void {
    this.orderService.getOrders().subscribe(data => {
      this.order = data;
    })
  }

  addOrder(): void {
    if (this.userName.length > 0 && this.userEmail.length > 0 && this.userPhone != null && this.userPay.length > 0 && this.userStreet.length > 0) {
      const newOrder = new Order(1,
        this.userName,
        this.userEmail,
        this.userPhone,
        this.userStreet,
        this.userPay,
        new Date)
      delete newOrder.id;
      this.orderService.postOrders(newOrder).subscribe(() => {
        this.getOrder()


      })
      this.basket = [];
      this.totalPrice = this.getTotal(this.basket);
      this.orderService.basket.next(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
      this.resetForm()
    }
    else {
      this.resetForm()

    }

  }
  resetForm(): void {
    this.userName = '';
    this.userEmail = '';
    this.userPhone = null;
    this.userStreet = '';
    this.userPay = '';
  }
}
