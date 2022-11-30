import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ShopComponent } from './components/shop/shop.component';
import { DashboardComponent } from './components/admin-custom/dashboard/dashboard.component';
import { ProductsComponent } from './components/admin-custom/products/products.component';
import { CategoryComponent } from './components/admin-custom/category/category.component';
import { AdminService } from 'src/app/services/admin.service';
import { DiscountsComponent } from './components/admin-custom/discounts/discounts.component';
import { LocationsComponent } from './components/admin-custom/locations/locations.component';
import { StoreComponent } from './components/admin-custom/store/store.component';
import { MediaComponent } from './components/admin-custom/media/media.component';
import { HomeComponent } from './components/shop-custom/home/home.component';
import {RegisterComponent} from './components/shop-custom/register/register.component';
import {AddOnComponent} from './components/admin-custom/add-on/add-on.component';
import {ProductCombinationsComponent} from './components/admin-custom/product-combinations/product-combinations.component';
import {BillsComponent} from './components/admin-custom/bills/bills.component';
import {NewsletterComponent} from './components/admin-custom/newsletter/newsletter.component';
import {BlogComponent} from './components/admin-custom/blog/blog.component';
import {CartCheckoutComponent} from './components/shop-custom/cart-checkout/cart-checkout.component';
import {CartPreviewComponent} from './components/shop-custom/cart-preview/cart-preview.component';
import {BlogSingleComponent} from './components/shop-custom/blog-single/blog-single.component';
import {BlogsComponent} from './components/shop-custom/blogs/blogs.component';
import {ProductSingleComponent} from './components/shop-custom/product-single/product-single.component';

const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'shop', component: ShopComponent, children: [
    {path: '', component: HomeComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'cart-preview', component: CartPreviewComponent},
    {path: 'cart-checkout', component: CartCheckoutComponent},
    {path: 'blogs', component: BlogsComponent},
    {path: 'blog-single/:blogid', component: BlogSingleComponent},
    {path: 'product-single/:productid', component: ProductSingleComponent},
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'store', component: StoreComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product-combinations', component: ProductCombinationsComponent},
    {path: 'product-add-on', component: AddOnComponent},
    {path: 'category', component:  CategoryComponent},
    {path: 'discounts', component:  DiscountsComponent},
    {path: 'bills', component:  BillsComponent},
    {path: 'locations', component:  LocationsComponent},
    {path: 'media', component:  MediaComponent},
    {path: 'newsletter', component:  NewsletterComponent},
    {path: 'blog', component:  BlogComponent},
  ], canActivateChild: [AdminService]},
  {path: '**', redirectTo: 'shop'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminService]
})
export class AppRoutingModule { }
