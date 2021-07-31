import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from '../../components/shop/shop.component';
import { HeaderComponent } from '../../components/shop-custom/header/header.component';
import { HeaderSearchComponent } from '../../components/shop-custom/header-search/header-search.component';
import { ShopLoaderComponent } from '../../components/shop-custom/shop-loader/shop-loader.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from '../../components/shop-custom/footer/footer.component';
import { FooterNewsletterComponent } from '../../components/shop-custom/footer-newsletter/footer-newsletter.component';
import { HomeBlogComponent } from '../../components/shop-custom/home/components/home-blog/home-blog.component';
import { HomeParallaxComponent } from '../../components/shop-custom/home/components/home-parallax/home-parallax.component';
import { HomeImageGroup2Component } from '../../components/shop-custom/home/components/home-image-group2/home-image-group2.component';
import { HomeImageGroup1Component } from '../../components/shop-custom/home/components/home-image-group1/home-image-group1.component';
import { HomeProductListComponent } from '../../components/shop-custom/home/components/home-product-list/home-product-list.component';
import { HomeDiscountsListComponent } from '../../components/shop-custom/home/components/home-discounts-list/home-discounts-list.component';
import { HomeCategorySliderComponent } from '../../components/shop-custom/home/components/home-category-slider/home-category-slider.component';
import { HomeComponent } from '../../components/shop-custom/home/home.component';
import { ProductAsideModalComponent } from '../../components/shop-custom/product-aside-modal/product-aside-modal.component';
import { WishlistAsideModalComponent } from '../../components/shop-custom/wishlist-aside-modal/wishlist-aside-modal.component';
import { AccountAsideModalComponent } from '../../components/shop-custom/account-aside-modal/account-aside-modal.component';
import { CartAsideModalComponent } from '../../components/shop-custom/cart-aside-modal/cart-aside-modal.component';
import { QuickViewProductComponent } from '../../components/shop-custom/quick-view-product/quick-view-product.component';
import { AsideModalSingleProductComponent } from '../../components/shop-custom/aside-modal-single-product/aside-modal-single-product.component';
import { AsideModalPricingComponent } from '../../components/shop-custom/aside-modal-pricing/aside-modal-pricing.component';
import { ListSingleProductComponent } from '../../components/shop-custom/home/components/list-single-product/list-single-product.component';
import {
  faPhone, faAt, faClock, faAngleRight, faBars, faSearch, faUser, faShoppingCart,
  faEye, faPlus, faMinus, faCheck,  faTimes, faTrashAlt, faEdit, faCartPlus,  faHeart,
  faStar, faArrowDown, faMapMarker,  faEnvelopeOpen, faEnvelopeOpenText, faFax
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';

import {QuickViewProductService} from '../../services/quick-view-product.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistAsideModalService } from 'src/app/services/wishlist-aside-modal.service';


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSearchComponent,
    ShopComponent,
    ShopLoaderComponent,
    FooterComponent,
    FooterNewsletterComponent,
    HomeBlogComponent,
    HomeParallaxComponent,
    HomeImageGroup2Component,
    HomeImageGroup1Component,
    HomeProductListComponent,
    ListSingleProductComponent,
    HomeDiscountsListComponent,
    HomeCategorySliderComponent,
    QuickViewProductComponent,
    HomeComponent,
    ProductAsideModalComponent,
    WishlistAsideModalComponent,
    AccountAsideModalComponent,
    CartAsideModalComponent,
    AsideModalSingleProductComponent,
    AsideModalPricingComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    SlickCarouselModule
  ],
  providers: [QuickViewProductService, ProductsService, WishlistAsideModalService]
})
export class ShopModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(
      faClock, faAt, faPhone, faAngleRight, faBars, faSearch, faUser, faPlus, faTimes, faMinus,
      faShoppingCart, faTrashAlt, faEdit, faHeart, faEye, faEnvelopeOpenText, faCheck, faStar,
      faArrowDown, faMapMarker, faEnvelopeOpen, faFax, faFacebookF, faInstagram, faCartPlus
    );
  }
}
