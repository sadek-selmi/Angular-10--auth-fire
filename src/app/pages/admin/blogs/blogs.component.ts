import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Blog } from 'src/app/classes/blog.model';
import { IBlog } from 'src/app/interfacecs/blog.interface';
import { BlogService } from 'src/app/service/blog.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  adminBlog: Array<IBlog> = [];
  blogID: number | string;
  blogTitle: string = '';
  blogText: string = '';
  blogAuthor: string = '';
  blogImage = 'https://lh3.googleusercontent.com/proxy/dXC4l3Z9A-PY_SbP8oLfMZZJxWSmpGiT7Z4rLSzvG8ULRC4foVeZ-M4JLyf9XLl8lWmWa_yBZiogQ8rn1U4ailLA89R2b1-tpun0dDPrulr-rFTaEyo4Oae8YA_0';
  editStatus = false;
  uploadPercent: Observable<number>;
  success = true;
  constructor(private blogService: BlogService, private storage: AngularFireStorage) {

  }

  ngOnInit(): void {
    this.getJsonAdminBlog()
  }
  getJsonAdminBlog(): void {
    this.blogService.getJsonBlogs().subscribe(data => {
      this.adminBlog = data;
    },
      err => {
        console.log(err);

      })
  }
  addAdminBlog(): void {
    if (this.blogTitle.length > 0 && this.blogText.length > 0 && this.blogAuthor.length > 0) {
      const newB = new Blog(1, this.blogTitle, this.blogText, new Date, this.blogAuthor, this.blogImage)
      delete newB.id
      this.blogService.postJsonBlogs(newB).subscribe(() => {
        this.getJsonAdminBlog()
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
  deleteAdminBlog(blog: IBlog): void {
    this.blogService.deleteJsonBlog(blog).subscribe(() => {
      this.getJsonAdminBlog()
    },
      err => {
        console.log(err);

      })
  }
  editAdminBlog(b: IBlog): void {
    this.blogID = b.id;
    this.blogAuthor = b.author;
    this.blogText = b.text;
    this.blogTitle = b.title;
    this.editStatus = true;
    this.blogImage = b.image;
  }
  saveAdminBlog(): void {
    const saveB = new Blog(1, this.blogTitle, this.blogText, new Date, this.blogAuthor, this.blogImage)
    saveB.id = +this.blogID;
    this.blogService.updateJsonBlog(saveB).subscribe(() => {
      this.getJsonAdminBlog();
    },
      err => {
        console.log(err);

      })
    this.resetForm();
    this.editStatus = false
  }
  resetForm() {
    this.blogTitle = '';
    this.blogText = '';
    this.blogAuthor = '';
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    console.log(file, filePath);
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges()
    this.uploadPercent.subscribe(data => {
      if (data > 0 || data < 100) {
        this.success = false;
      }
    },
      err => {
        console.log(err);

      })
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.blogImage = url;
        this.success = true;
        console.log(this.blogImage);

      });
    });
  }
}
