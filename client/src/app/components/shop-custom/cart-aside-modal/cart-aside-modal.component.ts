import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';
import {ProductCart} from '../../../interfaces/product';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-cart-aside-modal',
  templateUrl: './cart-aside-modal.component.html',
  styleUrls: ['./cart-aside-modal.component.scss']
})
export class CartAsideModalComponent implements OnInit, OnDestroy {
  productsSum = 0 as number;
  productsSumEnd = 0 as number;
  shipping = 0 as number;
  toggleModal = false as boolean;
  products: ProductCart[];

  subscription1: Subscription;
  subscription2: Subscription;
  constructor(@Inject(DOCUMENT) private document: Document, private cartAPService: CartAsideProductService) { }

  ngOnInit(): void {
    this.subscription1 = this.cartAPService.subscribeToggleModal().subscribe((res) => {
      this.toggleModal = res;
    });

    this.subscription2 = this.cartAPService.subscribeProductsForCart().subscribe(prods => {
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

  closeCartModal(): void{
    this.toggleModal = false;
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
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
    this.cartAPService.removeProductFromCart(productID);
  }

  edit(productID: number): void{

  }

  addToCart(productID: number): void{

  }
}
