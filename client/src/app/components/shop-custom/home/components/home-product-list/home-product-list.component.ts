import { Component, Input, OnInit } from '@angular/core';
import { ProductSingle } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import {ProductEnumSingleArr} from "../../../../../../../../routes/enums/product-enum";

@Component({
  selector: 'app-home-product-list',
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.scss']
})
export class HomeProductListComponent implements OnInit {
  @Input() title!: string;
  products: ProductSingle[] = [];

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

  slickInit(e): void {}

  breakpoint(e): void {}

  afterChange(e): void {}

  beforeChange(e): void {}

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    // get products
    this.productService.getAllProductByCustom(ProductEnumSingleArr.BEST_ASSESSMENT, {limit: 15}).then((prods: ProductSingle[]) => {
      this.products = prods;
    });
  }
}
