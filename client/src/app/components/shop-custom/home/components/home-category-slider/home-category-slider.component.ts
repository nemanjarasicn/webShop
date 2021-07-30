import { Component, OnInit } from '@angular/core';
import { CategoryBasic } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-category-slider',
  templateUrl: './home-category-slider.component.html',
  styleUrls: ['./home-category-slider.component.scss']
})
export class HomeCategorySliderComponent implements OnInit {
  categories: CategoryBasic[]
  title = 'ng-carousel-categories-list';   
  slides: {id: number, img: string, img_alt: string, name: string}[] = []
  slideConfig = {
    slidesToShow: 4,
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
  }
   
  slickInit(e) {}
     
  breakpoint(e) {}
     
  afterChange(e) {}
     
  beforeChange(e) {}
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getCategoriesWithImg().then(cats=>{
      cats.forEach(cat =>{
        this.slides.push({
          id: cat.id,
          img: cat.img_src,
          img_alt: cat.alt_text,
          name: cat.label
        })
      })
    })
  }

}
