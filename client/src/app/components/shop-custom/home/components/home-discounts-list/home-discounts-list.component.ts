import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/interfaces/discount';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-discounts-list',
  templateUrl: './home-discounts-list.component.html',
  styleUrls: ['./home-discounts-list.component.scss']
})
export class HomeDiscountsListComponent implements OnInit {
  discounts: Discount[]
  title = 'ng-carousel-discount';   
  
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    //get all active discounts
    this.productService.getActiveDiscounts().then(dis=>{
      this.discounts = dis
    })
  }

}
