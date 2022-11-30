import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';
import {ProductAsideModal, StorageProducts} from '../../../interfaces/product';
import {AsideModalTypes} from '../../../enums/aside-modal-types.enum';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-cart-aside-modal',
  templateUrl: './cart-aside-modal.component.html',
  styleUrls: ['./cart-aside-modal.component.scss']
})
export class CartAsideModalComponent implements OnInit, OnDestroy {
  productsSum!: number;
  toggleModal = false;
  products: ProductAsideModal[];
  asideModalType = AsideModalTypes;

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  constructor(
    private cartAPService: CartAsideProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.subscription3 = this.cartService.subscribeProductSum().subscribe(res => {
      this.productsSum = res;
    });

    this.subscription1 = this.cartAPService.subscribeToggleModal().subscribe((res) => {
      this.toggleModal = res;
    });

    this.subscription2 = this.cartAPService.subscribeProductsForCart().subscribe(prods => {
      this.products = prods || [];

      if (prods?.length > 0){
        this.productsSum = 0;

        prods.forEach(prod => {
          this.productsSum = this.productsSum + (prod?.new_price || prod.price) * (prod?.qty || 1);
        });

      }else{
        this.productsSum = 0;
      }

      this.cartService.setProductSum(this.productsSum);
    });
  }

  catchQtyEmit(param: StorageProducts): void{
    this.cartAPService.updateStorageQty(param);
  }

  closeCartModal(): void{
    this.cartAPService.setToggleModal(false);
  }

  catchTrashEmit(productID: number): void{
    this.cartAPService.removeProductFromCart(productID);
  }

  catchEditEmit(productID: number): void{
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
  }
}
