import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfacecs/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url : string
constructor(private http: HttpClient) { 
  this.url = 'http://localhost:3000/category'
}
getJsonCategory(): Observable<Array<ICategory>>{
  return this.http.get<Array<ICategory>>(this.url)
}
postJsonCategory(category: ICategory): Observable<Array<ICategory>>{
  return this.http.post<Array<ICategory>>(this.url, category)
}
deleteJsonCategory(category: ICategory): Observable<Array<ICategory>>{
  return this.http.delete<Array<ICategory>>(`${this.url}/${category.id}`)
}
updateJsonCategory(category: ICategory): Observable<Array<ICategory>>{
  return this.http.put<Array<ICategory>>(`${this.url}/${category.id}`, category)
}

}
