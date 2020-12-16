import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfacecs/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  postProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(product: IProduct): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${product.id}`);
  }
  getCategoryProduct(category: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.name=${category}`)
  }
  getOneProduct(id: number | string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`)
  }
}
