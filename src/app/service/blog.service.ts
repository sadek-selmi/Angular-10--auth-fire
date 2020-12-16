import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../interfacecs/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
private blog: Array<IBlog> = [
]
private url : string
constructor(private http: HttpClient) { 
  this.url = 'http://localhost:3000/blog'
}
  getJsonBlogs(): Observable<Array<IBlog>>{
    return this.http.get<Array<IBlog>>(this.url)
  }
  postJsonBlogs(blog: IBlog): Observable<Array<IBlog>>{
    return this.http.post<Array<IBlog>>(this.url, blog)
  }
  deleteJsonBlog(blog: IBlog): Observable<Array<IBlog>>{
    return this.http.delete<Array<IBlog>>(`${this.url}/${blog.id}`)
  }
  updateJsonBlog(blog: IBlog): Observable<Array<IBlog>>{
    return this.http.put<Array<IBlog>>(`${this.url}/${blog.id}`, blog)
  }
  getOneJSONBlog(id:number | string): Observable<IBlog>{
    return this.http.get<IBlog>(`${this.url}/${id}`)
  }
}
