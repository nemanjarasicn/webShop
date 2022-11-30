import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

import { AdminComponent } from '../../components/admin/admin.component';
import { LoginComponent } from '../../components/admin-custom/login/login.component';
import { DashboardComponent } from '../../components/admin-custom/dashboard/dashboard.component';
import { AdminMenuComponent } from '../../components/admin-custom/admin-menu/admin-menu.component';
import { AdminHeaderComponent } from '../../components/admin-custom/admin-header/admin-header.component';
import { ListComponent } from '../../components/admin-custom/list/list.component';
import { ProductsComponent } from '../../components/admin-custom/products/products.component';
import { CategoryComponent } from '../../components/admin-custom/category/category.component';
import { ListSelectComponent } from '../../components/admin-custom/list-select/list-select.component';
import { ShowFullMediaComponent } from '../../components/admin-custom/show-full-media/show-full-media.component';
import { PickMediaComponent } from '../../components/admin-custom/pick-media/pick-media.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faUserCircle, faWindowMaximize, faTachometerAlt, faStore, faChevronRight, faReceipt, faSignOutAlt, faEnvelopeOpenText,
  faThList, faPercent, faList, faPlusCircle, faPhotoVideo, faEdit, faTrashAlt, faToggleOff, faToggleOn,
  faMapMarkedAlt, faUsers, faImages, faBox, faComment, faCubes, faNewspaper, faLayerGroup, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { ListSelectService } from 'src/app/services/list-select.service';
import { ListService } from 'src/app/services/list.service';
import { DataTablesModule } from 'angular-datatables';
import { DiscountsComponent } from '../../components/admin-custom/discounts/discounts.component';
import { ToastComponent } from '../../components/admin-custom/toast/toast.component';
import { LocationsComponent } from '../../components/admin-custom/locations/locations.component';
import { LocationsService } from 'src/app/services/locations.service';
import { MediaComponent } from '../../components/admin-custom/media/media.component';
import { StoreComponent } from 'src/app/components/admin-custom/store/store.component';
import { MediaService } from 'src/app/services/media.service';
import {ProductCombinationsComponent} from '../../components/admin-custom/product-combinations/product-combinations.component';
import {AddOnComponent} from '../../components/admin-custom/add-on/add-on.component';
import {BillsComponent} from '../../components/admin-custom/bills/bills.component';
import {BlogComponent} from '../../components/admin-custom/blog/blog.component';
import {NewsletterComponent} from '../../components/admin-custom/newsletter/newsletter.component';
import {ProductAddOnService} from '../../services/product-add-on.service';
import {ProductCombinationsService} from '../../services/product-combinations.service';
import {BlogService} from "../../services/blog.service";

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
    StoreComponent,
    ProductCombinationsComponent,
    AddOnComponent,
    BillsComponent,
    BlogComponent,
    NewsletterComponent
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
  providers: [
    AdminService,
    ProductsService,
    ListService,
    ListSelectService,
    LocationsService,
    MediaService,
    ProductAddOnService,
    ProductCombinationsService,
    BlogService
  ],
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUserCircle, faImages, faUsers, faComment, faEnvelopeOpenText, faTimes, faMapMarkedAlt, faWindowMaximize, faNewspaper, faLayerGroup, faTachometerAlt, faStore, faCubes, faChevronRight, faBox, faReceipt, faSignOutAlt, faThList, faPercent, faList, faPlusCircle, faPhotoVideo, faEdit, faTrashAlt, faToggleOff, faToggleOn);
  }
}
