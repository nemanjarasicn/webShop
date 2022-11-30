import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {Subscription} from 'rxjs';
import {ProductAsideModal} from '../../../interfaces/product';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit, OnDestroy {
  ths = ['Slika', 'Naziv', 'Cena', 'Količina', 'Ukloni', 'Ukupno'];
  productsSum!: number;
  shipping!: number;
  cartTotal!: number;
  products!: ProductAsideModal[];

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;

  constructor(
    private cartService: CartService,
    private cartAPService: CartAsideProductService
  ) { }

  ngOnInit(): void {
    this.subscription4 = this.cartAPService.subscribeProductsForCart().subscribe(res => {
      this.products = res || [];
    });

    this.subscription1 = this.cartService.subscribeProductSum().subscribe(res => {this.productsSum = res; });
    this.subscription2 = this.cartService.subscribeShipping().subscribe(res => {this.shipping = res; });
    this.subscription3 = this.cartService.subscribeCartTotal().subscribe(res => {this.cartTotal = res; });
  }

  ngOnDestroy(): void{
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
    this.subscription4?.unsubscribe();
  }

  removeProductFromCart(id: number): void{
    this.cartAPService.removeProductFromCart(id);
  }
}
