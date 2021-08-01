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

const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'shop', component: ShopComponent, children: [
    {path: '', component: HomeComponent },
    {path: 'register', component: RegisterComponent}
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'store', component: StoreComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'category', component:  CategoryComponent},
    {path: 'discounts', component:  DiscountsComponent},
    {path: 'locations', component:  LocationsComponent},
    {path: 'media', component:  MediaComponent},
  ], canActivateChild: [AdminService]},
  {path: '**', redirectTo: 'shop'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminService]
})
export class AppRoutingModule { }
