import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './modules/admin/admin.module';
import { ShopModule } from './modules/shop/shop.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StorageService} from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ShopModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
