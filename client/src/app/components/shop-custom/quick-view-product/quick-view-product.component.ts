import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('closeModalRef') closeModalRef: ElementRef<HTMLButtonElement>;
  product: ProductSingle;
  subscription: Subscription;
  activeMainImg: string;
  qty = 1;
  gallery: {
    id: number,
    src_name: string,
    alt_text?: string
  }[];
  constructor(
    private qvProductService: QuickViewProductService,
    private cartAPService: CartAsideProductService,
  ) { }

  ngOnInit(): void {
    // get product
    this.qvProductService.subscribeProduct().subscribe((prod) => {
      if (prod){
        this.activeMainImg = prod?.image?.src_name;
        this.gallery = [prod?.image, ...prod?.gallery];
        this.product = prod;
      }
    });
  }

  minus(): void{
    if (this.qty > 1) {
      this.qty = this.qty - 1;
    }
  }

  plus(): void{
    this.qty = this.qty + 1;
  }

  addToCart(productID: number): void{
    this.cartAPService.setNewToCart({productID, qty: this.qty});
    this.closeModalRef.nativeElement.click();
    this.qty = 1;
  }

  setActiveMainImg(srcName?: string): void{
    if (srcName) { this.activeMainImg = srcName; }
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }
}
