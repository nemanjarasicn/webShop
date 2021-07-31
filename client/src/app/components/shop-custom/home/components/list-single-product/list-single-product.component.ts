import { Component, Input, OnInit } from '@angular/core';
import {ProductSingle} from '../../../../../interfaces/product';
import {QuickViewProductService} from '../../../../../services/quick-view-product.service';
import {WishlistAsideModalService} from '../../../../../services/wishlist-aside-modal.service';
import {CartAsideProductService} from '../../../../../services/cart-aside-product.service';

@Component({
  selector: 'app-list-single-product',
  templateUrl: './list-single-product.component.html',
  styleUrls: ['./list-single-product.component.scss']
})
export class ListSingleProductComponent implements OnInit {
  @Input() product: ProductSingle;
  isItOpen = false as boolean;
  qty = 1 as number;
  constructor(
    private qvProductService: QuickViewProductService,
    private wishlistAMService: WishlistAsideModalService,
    private cartAMService: CartAsideProductService
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
    console.log(this.product.id);
    this.cartAMService.setNewToCart(this.product.id);
  }
  setProductQV(): void{
    this.qvProductService.setProduct(this.product.id);
  }

  addToWishlist(): void{
    this.wishlistAMService.setNewToWishlist(this.product.id);
  }

}
