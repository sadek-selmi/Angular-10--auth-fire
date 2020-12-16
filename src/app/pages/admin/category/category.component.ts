import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/interfacecs/category.interface';
import { CategoriesService } from 'src/app/service/categories.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from 'src/app/classes/category.model';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Array<ICategory> = [];
  categoryID: number | string;
  categoryName: string = '';
  editStatus = false;
  modalRef: BsModalRef;
  check = true;
  searchName:string;
  constructor(private catService: CategoriesService, private storage: AngularFireStorage, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.getCategory()
  }
  getCategory(): void {
    this.catService.getJsonCategory().subscribe(data => {
      this.category = data;
    },
      err => {
        console.log(err);

      })
  }
  addCategory(): void {
    if (this.categoryName.length > 0) {
  
      const newC = new Category(1, this.categoryName)
      delete newC.id
      this.catService.postJsonCategory(newC).subscribe(() => {
        console.log('sdfsdf');
        
        this.getCategory()
      },
        err => {
          console.log(err);

        })
      this.resetForm();
    }
    else {
    
      this.resetForm()
    }
  }
  deleteCategory(category: ICategory): void {
    this.catService.deleteJsonCategory(category).subscribe(() => {
      this.getCategory()
    },
      err => {
        console.log(err);

      })
  }
  editCategory(cat: ICategory): void {
    this.categoryID = cat.id;
    this.categoryName = cat.name;
    this.editStatus = true;

  }
  saveCategory(): void {
    const saveC = new Category(1, this.categoryName)
    saveC.id = +this.categoryID;
    this.catService.updateJsonCategory(saveC).subscribe(() => {
      this.getCategory();

    },
      err => {
        console.log(err);

      })
    this.resetForm();
    this.editStatus = false
  }
  resetForm() {
    this.categoryName = '';
  }
  openAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-dialog-centered ' }));
  }
  openDel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-sm modal-dialog-centered ' }));
  }
  change():void{
    if(this.categoryName.length > 0){
      this.check = false
    }
    else{
      this.check = true
    }
    
  }
}
