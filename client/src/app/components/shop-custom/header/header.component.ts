import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryMenu } from 'src/app/interfaces/category';
import * as $ from 'jquery';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistAsideModalService } from 'src/app/services/wishlist-aside-modal.service';
import { Subscription } from 'rxjs';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';
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
    private cartAPService: CartAsideProductService
  ) { }

  ngOnInit(): void {
   document.addEventListener('scroll', () => {
      if ($(this).scrollTop() > 400){
        $('header').addClass('sticky');
      }
      else{
        $('header').removeClass('sticky');
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

  open(eleID: string): void {
    document.getElementById(eleID).classList.add('open-side');
  }
  close(eleID: string): void {
    document.getElementById(eleID).classList.remove('open-side');
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