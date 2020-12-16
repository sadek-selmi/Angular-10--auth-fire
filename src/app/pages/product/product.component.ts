import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { ICategory } from 'src/app/interfacecs/category.interface';
import { IProduct } from 'src/app/interfacecs/product.interface';
import { CategoriesService } from 'src/app/service/categories.service';
import { ProductsService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isCollapsed = false;
  myclick = false;
  myheight = '';
  products: Array<IProduct> = [];
  category: Array<ICategory> = [];
  constructor(private prodService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private catService: CategoriesService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categories = this.activatedRoute.snapshot.paramMap.get('category');
        this.getProducts(categories);
      }
    });
  }

  ngOnInit(): void {
    // this.getProducts();
    this.getCategories()
  }

  // private getProducts(): void {
  //   this.prodService.getProducts().subscribe(data => {
  //     this.products = data
  //   })
  // }
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
  menuClick(): void {
    this.myclick = !this.myclick;
    if (this.myclick) {
      this.myheight = ((this.category.length + 1) * 60) + 'px'
    }
    else {

    }

  }
  //  addToBasket(prod:IProduct):void{
  //    this.orderService.addBasket(prod)
  //    console.log(prod);
  //    prod.count = 1;


  //  }
}
