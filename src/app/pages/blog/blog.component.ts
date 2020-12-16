import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/interfacecs/blog.interface';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  userBlogs: Array<IBlog> = [];
  constructor(private blogS: BlogService) { }

  ngOnInit(): void {
this.getUserBlog()
  }
 getUserBlog():void{
  this.blogS.getJsonBlogs().subscribe(data => {
    this.userBlogs = data;
  },
  err => {
    console.log(err);
    
  })
}
}
