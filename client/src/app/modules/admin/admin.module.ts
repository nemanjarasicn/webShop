import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

import { AdminComponent } from '../../components/admin/admin.component';
import { LoginComponent } from '../../components/custom/login/login.component';
import { DashboardComponent } from '../../components/custom/dashboard/dashboard.component';
import { AdminMenuComponent } from '../../components/custom/admin-menu/admin-menu.component';
import { AdminHeaderComponent } from '../../components/custom/admin-header/admin-header.component';
import { ListComponent } from '../../components/custom/list/list.component';
import { ProductsComponent } from '../../components/custom/products/products.component';
import { CategoryComponent } from '../../components/custom/category/category.component';
import { ListSelectComponent } from '../../components/custom/list-select/list-select.component';
import { ShowFullMediaComponent } from '../../components/custom/show-full-media/show-full-media.component';
import { PickMediaComponent } from '../../components/custom/pick-media/pick-media.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faUserCircle, faWindowMaximize, faTachometerAlt, faStore, faChevronRight, faReceipt, faSignOutAlt,
  faThList, faPercent, faList, faPlusCircle, faPhotoVideo, faEdit, faTrashAlt, faToggleOff, faToggleOn,
  faMapMarkedAlt, faUsers, faImages, faBox, faComment
 } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { ListSelectService } from 'src/app/services/list-select.service';
import { ListService } from 'src/app/services/list.service';
import { DataTablesModule } from "angular-datatables";
import { DiscountsComponent } from '../../components/custom/discounts/discounts.component';
import { ToastComponent } from '../../components/custom/toast/toast.component';
import { LocationsComponent } from '../../components/custom/locations/locations.component';
import { LocationsService } from 'src/app/services/locations.service';
import { MediaComponent } from '../../components/custom/media/media.component';
import { StoreComponent } from 'src/app/components/custom/store/store.component';
import { MediaService } from 'src/app/services/media.service';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    ToastComponent,
    AdminMenuComponent,
    AdminHeaderComponent,
    ListComponent,
    ProductsComponent,
    CategoryComponent,
    DiscountsComponent,
    ListSelectComponent,
    LocationsComponent,
    MediaComponent,
    ShowFullMediaComponent,
    PickMediaComponent,
    StoreComponent
  ],
  imports: [
    AppRoutingModule,
    DataTablesModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
  ],
  providers: [AdminService, ProductsService, ListService, ListSelectService, LocationsService, MediaService],
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUserCircle, faImages, faUsers, faComment, faMapMarkedAlt, faWindowMaximize, faTachometerAlt, faStore, faChevronRight, faBox, faReceipt, faSignOutAlt, faThList, faPercent, faList, faPlusCircle, faPhotoVideo, faEdit, faTrashAlt, faToggleOff, faToggleOn);
  } 
}
