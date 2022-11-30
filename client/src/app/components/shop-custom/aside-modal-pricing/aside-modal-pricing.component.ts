import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {AsideModalTypes} from '../../../enums/aside-modal-types.enum';
import {CartService} from '../../../services/cart.service';
import {Subscription} from 'rxjs';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';

@Component({
  selector: 'app-aside-modal-pricing',
  templateUrl: './aside-modal-pricing.component.html',
  styleUrls: ['./aside-modal-pricing.component.scss']
})
export class AsideModalPricingComponent implements OnInit, OnDestroy {
  productsSum!: number;
  cartTotal!: number;
  @Input() type: AsideModalTypes;
  shipping!: number;
  asideModalTypes = AsideModalTypes;
  minShippingPrice = 800;

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  constructor(
    private cartAPService: CartAsideProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.subscription1 = this.cartService.subscribeProductSum().subscribe(res => {
      this.productsSum = res;
      this.shipping = this.productsSum < this.minShippingPrice ? this.minShippingPrice : 0;

      this.cartService.setShipping(this.shipping);
      this.cartService.setCartTotal(this.productsSum + this.shipping);
    });

    this.subscription2 = this.cartService.subscribeCartTotal().subscribe(res => {
      this.cartTotal = res;
    });

    this.subscription2 = this.cartService.subscribeShipping().subscribe(res => {
      this.shipping = res;
    });
  }

  ngOnDestroy(): void{
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
  }

  closeCartModal(): void {
    this.cartAPService.setToggleModal(false);
  }
}
