import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminGuard } from './guards/admin.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { BlogsComponent } from './pages/admin/blogs/blogs.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { BasketComponent } from './pages/basket/basket.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BlogComponent } from './pages/blog/blog.component';

import { PizzaComponent } from './pages/product/pizza/pizza.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blog' },
  { path: 'blog', component: BlogComponent},
  { path: 'basket', component: BasketComponent },
  { path: 'profile', component: ProfileComponent,  canActivate: [ProfileGuard] },
  { path: 'menu',component: ProductComponent, children: [
    { path: ':category', component: PizzaComponent },

  ] },  
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],  children: [
    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'adminBlogs', component: BlogsComponent }
  ] },  
  { path: '**', component: BlogComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
