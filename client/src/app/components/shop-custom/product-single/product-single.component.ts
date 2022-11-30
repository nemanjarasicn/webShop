import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../services/products.service';
import {ProductSingle} from '../../../interfaces/product';
import {WishlistAsideModalService} from '../../../services/wishlist-aside-modal.service';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';
import {QuickViewProductService} from '../../../services/quick-view-product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit, AfterViewInit, OnDestroy {
  qty = 1;
  productId!: number;
  activeImg!: {src: string, alt: string};
  addOnsPrice = 0;
  product: ProductSingle;
  relatedProducts: ProductSingle[];

  subscription: Subscription;
  constructor(
    private cartAsaService: CartAsideProductService,
    private wlAsaService: WishlistAsideModalService,
    private route: ActivatedRoute,
    private qvProductService: QuickViewProductService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(res => {
      this.productId = res.productid;

      this.getSingleAndRelated();
    });
  }

  ngAfterViewInit(): void{
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  getSingleAndRelated(): void{
    this.productService.getTogetherSingle_Relater({id: this.productId}).then( res => {
      this.product = res.single;
      this.relatedProducts = res.related;

      this.activeImg = {
        src: this.product?.image.src_name || 'assets/images/noimg.png',
        alt: this.product?.image?.alt_text || this.product.name
      };
    });
  }

  setActiveImg(imgSrc: string, imgAlt: string): void{
    this.activeImg = {
      src: imgSrc,
      alt: imgAlt
    };
  }

  minus(): void {
    if (this.qty > 1) { this.qty -= 1; }
  }

  plus(): void{
    this.qty += 1;
  }

  addToCart(productID: number): void{
    this.cartAsaService.setNewToCart({productID, qty: this.qty});
  }

  addToCartRelated(productID: number, qty: number): void{
    this.cartAsaService.setNewToCart({productID, qty});
  }

  addToWishlist(productId: number): void{
    this.wlAsaService.setNewToWishlist(productId);
  }

  setProductQV(productId: number): void{
    this.qvProductService.setProduct(productId);
  }

  addOptionAddOn(addOnId: number): void{

  }
}
