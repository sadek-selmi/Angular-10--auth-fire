import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { element } from 'protractor';
import { ICategory } from 'src/app/interfacecs/category.interface';
import { IProduct } from 'src/app/interfacecs/product.interface';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriesService } from 'src/app/service/categories.service';
import { OrderService } from 'src/app/service/order.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  basket: Array<IProduct> = [];
  category: Array<ICategory> = [];
  totalPrice = 0;
  out = false;
  up = false;
  modalRef: BsModalRef;
  inputEmail:string;
  inputPassword: string;
  inputStreet:string;
  userSName:string;
  userFName:string;
  inputCity: string;
  inputState:string;
  inputZip:string;
  userEmail:string;
  userPassword:string;
  admin = false;
  constructor(private orderService: OrderService,
    private catService: CategoriesService,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkMyBasket();
    this.getLocalProd();
    this.getCategories();
  }

  private getCategories(): void {
    this.catService.getJsonCategory().subscribe(data => {
      this.category = data


    })
  }
  private checkMyBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.basket = data;
        this.totalPrice = this.getTotal(this.basket)
      }
    )
  }
  private getLocalProd(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket)
    }
  }
  private getTotal(prod: Array<IProduct>): number {
    return prod.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }
  signModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg modal-dialog-centered' })
    );
  }
  signInModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

 signUP():void{

    
    if(this.inputEmail && this.inputPassword && this.inputStreet && this.userSName && this.userFName && this.inputCity && this.inputState && this.inputZip){
      this.authService.signUp(this.inputEmail, this.inputPassword, this.inputStreet, this.userFName,  this.userSName, this.inputCity, this.inputState, this.inputZip)
      this.out = true;
      this.up = true;
    }
    else{
      this.up = false;
      this.resetForm();
    }
  }
  signIN():void{
    if(this.userEmail && this.userPassword){
      this.authService.signIn(this.userEmail, this.userPassword)
      if(this.userEmail == 'admin@gmail.com'){
        this.admin = true
        this.out = true;
        this.resetForm()
      }
      else{
        this.up = true;
        this.out = true;
        this.resetForm();
      }
    }
    else{
      this.resetForm();
    }
  }
  resetForm():void{
    this.inputEmail = '';
  this.inputPassword = '';
  this.inputStreet = '';
  this.userFName = '';
  this.userSName = '';
  this.inputCity = '';
  this.inputState = '';
  this.inputZip = '';
  this.userEmail = '';
  this.userPassword = '';
  }
  signOUT():void{
    this.authService.signOut();
    this.out = false;
    this.up = false;
    this.admin = false;
  }
  openDel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-sm modal-dialog-centered ' }));
  }

  
}
