import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductSingle } from 'src/app/interfaces/product';
import { QuickViewProductService } from 'src/app/services/quick-view-product.service';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';

@Component({
  selector: 'app-quick-view-product',
  templateUrl: './quick-view-product.component.html',
  styleUrls: ['./quick-view-product.component.scss']
})
export class QuickViewProductComponent implements OnInit, OnDestroy {
  product: ProductSingle;
  subscription: Subscription;
  activeMainImg: string;
  gallery: {
    id: number,
    src_name: string,
    alt_text?: string
  }[];
  constructor(private qvProductService: QuickViewProductService, private cartAPService: CartAsideProductService) { }

  ngOnInit(): void {
    // get product
    this.qvProductService.subscribeProduct().subscribe((prod) => {
      if (prod){
        this.activeMainImg = prod?.image[0]?.src_name;
        this.gallery = [...prod?.image, ...prod?.gallery];
        this.product = prod;
      }
    });
  }

  minus(): void{

  }

  plus(): void{

  }

  addToCart(productID: number): void{
    this.cartAPService.setNewToCart(productID);
  }

  setActiveMainImg(srcName: string): void{
    this.activeMainImg = srcName;
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }
}
