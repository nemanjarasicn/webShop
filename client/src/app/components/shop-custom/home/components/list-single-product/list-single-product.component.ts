import { Component, Input, OnInit } from '@angular/core';
import {ProductSingle} from '../../../../../interfaces/product';
import {QuickViewProductService} from '../../../../../services/quick-view-product.service';
import {WishlistAsideModalService} from '../../../../../services/wishlist-aside-modal.service';
import {CartAsideProductService} from '../../../../../services/cart-aside-product.service';
import {NotificationService} from '../../../../../services/notification.service';

@Component({
  selector: 'app-list-single-product',
  templateUrl: './list-single-product.component.html',
  styleUrls: ['./list-single-product.component.scss']
})
export class ListSingleProductComponent implements OnInit {
  @Input() product: ProductSingle;
  isItOpen = false;
  qty = 1;
  constructor(
    private qvProductService: QuickViewProductService,
    private wishlistAMService: WishlistAsideModalService,
    private cartAMService: CartAsideProductService,
  ) { }

  ngOnInit(): void {
  }

  add(): void{
    this.isItOpen = true;
    this.qty = 1;
  }

  plusQty(): void{
    this.qty += 1;
  }

  minusQty(): void{
    if (this.qty > 1) { this.qty -= 1; }
    else { this.isItOpen = false; }
  }

  confirmAdd(): void{
    this.cartAMService.setNewToCart({productID: this.product.id, qty: this.qty});

    this.qty = 1;
    this.isItOpen = false;
  }

  setProductQV(): void{
    this.qvProductService.setProduct(this.product.id);
  }

  addToWishlist(): void{
    this.wishlistAMService.setNewToWishlist(this.product.id);
  }

}
