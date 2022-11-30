import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductAsideModal } from 'src/app/interfaces/product';
import { WishlistAsideModalService } from 'src/app/services/wishlist-aside-modal.service';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';
import {AsideModalTypes} from '../../../enums/aside-modal-types.enum';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-wishlist-aside-modal',
  templateUrl: './wishlist-aside-modal.component.html',
  styleUrls: ['./wishlist-aside-modal.component.scss']
})
export class WishlistAsideModalComponent implements OnInit, OnDestroy {

  products: ProductAsideModal[];
  productsSum = 0;

  openWishlistModal!: boolean;
  asideModalType = AsideModalTypes;
  subscription1: Subscription;
  subscription2: Subscription;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private wishlistAMService: WishlistAsideModalService,
    private cartAPService: CartAsideProductService,
    private notifService: NotificationService
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

      }else { this.productsSum = 0; }
    });
  }

  closeWishlist(): void{
    this.wishlistAMService.setToggleModal(false);
  }

  catchTrashEmit(productID: number): void{
    this.wishlistAMService.removeProductFromWL(productID);
  }

  catchEditEmit(productID: number): void{

  }

  catchAddToCartEmit(product: {id: number, name: string, qty: number}): void{
    this.cartAPService.setNewToCart({productID: product.id, qty: product.qty});
    this.notifService.showNotification(`U korpu dodato: ${product.name}`);
  }

  ngOnDestroy(): void{
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
