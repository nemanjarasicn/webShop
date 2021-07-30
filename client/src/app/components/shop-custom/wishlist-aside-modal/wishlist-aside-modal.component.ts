import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductWishlist } from 'src/app/interfaces/product';
import { WishlistAsideModalService } from 'src/app/services/wishlist-aside-modal.service';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';

@Component({
  selector: 'app-wishlist-aside-modal',
  templateUrl: './wishlist-aside-modal.component.html',
  styleUrls: ['./wishlist-aside-modal.component.scss']
})
export class WishlistAsideModalComponent implements OnInit, OnDestroy {

  products: ProductWishlist[];
  productsSum = 0;
  productsSumEnd = 0;

  openWishlistModal!: boolean;

  subscription1: Subscription;
  subscription2: Subscription;
  shipping = 0 as number;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private wishlistAMService: WishlistAsideModalService,
    private cartAPService: CartAsideProductService
  ) { }

  ngOnInit(): void {
    // for toggle modal view
    this.subscription1 = this.wishlistAMService.subscribeToggleModal().subscribe(res => {
      this.openWishlistModal = res;
    });

    // get products from storage for wishlist
    this.subscription2 = this.wishlistAMService.subscribeProductsForWishlist().subscribe(prods => {

      this.products = prods || [];
      if (prods?.length > 0){
        this.productsSum = 0;
        prods.forEach(prod => {
          this.productsSum = this.productsSum + prod?.new_price || prod.price;
        });

        this.productsSumEnd = this.productsSum + this.shipping;
      }else{
        this.productsSum = 0;
        this.productsSumEnd = 0;
      }
    });
  }

  closeWishlist(): void{
    this.wishlistAMService.setToggleModal(false);
  }

  minus(productID: number): void{
    const ele = this.document.getElementById('productInput' + productID) as HTMLInputElement;
    ele.value = +ele.value < 2 ? ele.value : `${+ele.value - 1}`;
  }

  plus(productID: number): void{
    const ele = this.document.getElementById('productInput' + productID) as HTMLInputElement;
    ele.value = `${+ele.value + 1}`;
  }

  trash(productID: number): void{
    this.wishlistAMService.removeProductFromWL(productID);
  }

  edit(productID: number): void{

  }

  addToCart(productID: number): void{
    this.cartAPService.setNewToCart(productID);
  }

  ngOnDestroy(): void{
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
