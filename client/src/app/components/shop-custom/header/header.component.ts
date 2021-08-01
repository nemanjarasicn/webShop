import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryMenu } from 'src/app/interfaces/category';
import * as $ from 'jquery';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistAsideModalService } from 'src/app/services/wishlist-aside-modal.service';
import { Subscription } from 'rxjs';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';
import {AccountAsideModalService} from '../../../services/account-aside-modal.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  wishlistCount!: number;
  cartlistCount = 0;
  categories: CategoryMenu[];


  subscription1: Subscription;
  subscription2: Subscription;
  constructor(
    private productService: ProductsService,
    private wishlistAMService: WishlistAsideModalService,
    private cartAPService: CartAsideProductService,
    private accountAMService: AccountAsideModalService
  ) { }

  ngOnInit(): void {
   document.addEventListener('scroll', function(): void {
      if ($(this).scrollTop() > 400){
        $('#stickyheader').addClass('sticky');
      }
      else{
        $('#stickyheader').removeClass('sticky');
      }
    });

    // getCategories
   this.productService.getAllCategoriesMenu().then(cats => {
      this.categories = cats;
    });

    // get wishlist count
   this.subscription1 = this.wishlistAMService.subscribeWishlistProductsCount().subscribe(num => {
      this.wishlistCount = num;
    });

    // get cart count
   this.subscription2 = this.cartAPService.subscribeCartProductsCount().subscribe(num => {
      this.cartlistCount = num;
    });
  }

  smnavbtnClick(): void{
    $('.nav-slide').css('left', '0px');
  }

  navsmbackClick(): void{
    $('.nav-slide').css('left', '-410px');
  }

  toggleAccountModal(): void {
    this.accountAMService.setToggleModal(true);
  }

  mobileBackClick(): void{
    $('.sm-horizontal').css('right', '-410px');
  }
  toggleNavClick(): void{
      $('.sm-horizontal').css('right', '0px');
  }

  toggleWishlistAsideModal(): void{
    this.wishlistAMService.setToggleModal(true);
  }

  toggleCartAsideModal(): void{
    this.cartAPService.setToggleModal(true);
  }

  ngOnDestroy(): void{
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
