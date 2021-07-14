import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component'
import { ShopComponent } from './components/shop/shop.component'
import { DashboardComponent } from './components/custom/dashboard/dashboard.component'
import { ProductsComponent } from './components/custom/products/products.component'
import { CategoryComponent } from './components/custom/category/category.component'
import { AdminService } from 'src/app/services/admin.service'
import { DiscountsComponent } from './components/custom/discounts/discounts.component';
import { LocationsComponent } from './components/custom/locations/locations.component';
import { StoreComponent } from './components/custom/store/store.component';
import { MediaComponent } from './components/custom/media/media.component';

const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'shop', component: ShopComponent},
  {path: 'admin', component: AdminComponent, children:[
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
