import { Component, Input, OnInit } from '@angular/core';
import { ProductSingle } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { QuickViewProductService } from 'src/app/services/quick-view-product.service';
import { WishlistAsideModalService } from 'src/app/services/wishlist-aside-modal.service';

@Component({
  selector: 'app-home-product-list',
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.scss']
})
export class HomeProductListComponent implements OnInit {
  @Input() title!: string
  //@Input() custom?: string
  products: ProductSingle[] = []

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
   
  slickInit(e) {}
     
  breakpoint(e) {}
     
  afterChange(e) {}
     
  beforeChange(e) {}

  constructor(private productService: ProductsService, private qvProductService: QuickViewProductService, private wishlistAMService: WishlistAsideModalService) { }

  ngOnInit(): void {
    //get products
    //@ts-ignore
    this.productService.getAllProductByCustom(0).then((prods: ProductSingle)=>{
      //@ts-ignore
      this.products = prods
    })
  }

  add(toBeOpend, qtyInp): void{
    $('#' + toBeOpend).addClass("open");
    $("#" + qtyInp).val('1')
  }

  plus(qtyInp): void{    
      const $qty = $('#' + qtyInp)
      const currentVal = +$qty.val()
      if (!isNaN(currentVal)) $qty.val(currentVal + 1)
  }

  minus(toBeOpend, qtyInp): void{
      const $qty = $('#' + qtyInp)
      const _val =  $($qty).val();
      if(_val == '1') {
        const _removeCls = $('#' + toBeOpend)
        $(_removeCls).removeClass("open")
      }
      const currentVal = +$qty.val()
      if (!isNaN(currentVal) && currentVal > 0) $qty.val(currentVal - 1)
  }

  confirmAdd(product_id: number): void{
    //add value to cart for given product
  }

  setProductQV(product_id: number): void{
    this.qvProductService.setProduct(product_id)
  }

  addToWishlist(product_id: number): void{
    this.wishlistAMService.setNewToWishlist(product_id)
  }
}
