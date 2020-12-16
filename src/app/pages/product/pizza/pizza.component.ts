import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { ICategory } from 'src/app/interfacecs/category.interface';
import { IProduct } from 'src/app/interfacecs/product.interface';
import { CategoriesService } from 'src/app/service/categories.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductsService } from 'src/app/service/product.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  category: Array<ICategory> = [];
  products: Array<IProduct> = [];
  constructor(private prodService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute, private orderService: OrderService,
    private catService: CategoriesService) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          const categories = this.activatedRoute.snapshot.paramMap.get('category');
          this.getProducts(categories);
        }
      });
  }

  ngOnInit(): void {

    this.getCategories()
  }


  private getProducts(category: string): void {
    this.prodService.getCategoryProduct(category).subscribe(
      data => {
        this.products = data;

      }
    );
  }
  private getCategories(): void {
    this.catService.getJsonCategory().subscribe(data => {
      this.category = data


    })
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
  }
  addToBasket(prod: IProduct): void {
    this.orderService.addBasket(prod)
    console.log(prod);
    prod.count = 1;


  }
}
