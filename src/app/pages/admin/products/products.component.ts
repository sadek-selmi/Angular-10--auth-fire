import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Product } from 'src/app/classes/product.model';
import { ICategory } from 'src/app/interfacecs/category.interface';
import { IProduct } from 'src/app/interfacecs/product.interface';
import { CategoriesService } from 'src/app/service/categories.service';
import { ProductsService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: Array<ICategory> = [];
  currentCategory: ICategory;
  productName: string = '';
  productID: number | string;
  categoryName: string;
  productDescription: string = '';
  products: Array<IProduct> = [];
  productPrice: number = null;
  productImage: string = '';
  uploadPercent: Observable<number>;
  modalRef: BsModalRef;
  check = true;
  success = false;
  searchName: string;
  editStatus = false;
  length: number = 0;
  procent = true
  constructor(private modalService: BsModalService, private catService: CategoriesService, private storage: AngularFireStorage, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct()
  }
  getCategories(): void {
    this.catService.getJsonCategory().subscribe(data => {
      this.categories = data;
      this.currentCategory = this.categories[0]
    })
  }

  getProduct(): void {
    this.prodService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  addProduct(): void {
    if (this.productName.length > 0 && this.productDescription.length > 0 && this.productPrice != null && this.productImage.length > 0) {
      this.currentCategory = this.categories.filter(cat => cat.name === this.categoryName)[0];
      const newProd = new Product(1,
        this.currentCategory,
        this.productName,
        this.productDescription,
        this.productPrice,
        this.productImage)
      delete newProd.id;
      this.prodService.postProduct(newProd).subscribe(() => {
        this.getProduct()


      })
      this.length = 0
      this.resetForm()
    }
    else {
      this.resetForm()
      this.length = 0
    }

  }
  deleteProd(prod: IProduct): void {
    this.prodService.deleteProduct(prod).subscribe(() => {
      this.getProduct()
    },
      err => {
        console.log(err);

      })
  }
  editProd(prod: IProduct): void {
    this.productID = prod.id
    this.currentCategory = prod.category
    this.categoryName = prod.category.name;
    this.productName = prod.name;
    this.productDescription = prod.description;


    this.productPrice = prod.price;
    this.productImage = prod.image;
    this.editStatus = true;

  }
  saveProd(): void {

    this.currentCategory = this.categories.filter(cat => cat.name === this.categoryName)[0];
    const saveP = new Product(1, this.currentCategory, this.productName, this.productDescription, this.productPrice, this.productImage)
    saveP.id = +this.productID;
    this.prodService.updateProduct(saveP).subscribe(() => {
      this.getProduct();

    },
      err => {
        console.log(err);

      })
    this.resetForm();
    this.editStatus = false
    this.length = 0;
  }
  resetForm() {
    this.categoryName = '';
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
    this.productImage = '';
    this.length = 0;
    this.success = false;
    this.procent = true;
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges()
    this.uploadPercent.subscribe(data => {
      if (data <= 101) {
        this.procent = true;
      }

    },
      err => {
        console.log(err);

      })

    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.success = true
        this.procent = false;
      });
    });
  }
  openAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-dialog-centered ' }));
  }
  openDel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-sm modal-dialog-centered ' }));
  }
}
