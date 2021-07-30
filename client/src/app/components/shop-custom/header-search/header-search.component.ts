import { Component, OnInit, Input } from '@angular/core';
import { CategoryBasic, CategoryMenu } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  @Input() categories!: CategoryMenu[]
  parentCategories: CategoryBasic[]
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    //getParentCategories
    this.productService.getAllParentCategories().then(cats=>{
      this.parentCategories = cats
    })
  }

  submitSearch(): void{
    
  }

}
