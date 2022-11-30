import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductSingle } from '../interfaces/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class QuickViewProductService {

  private product$: BehaviorSubject<ProductSingle> = new BehaviorSubject<ProductSingle>(null);
  constructor(private productService: ProductsService) { }

  subscribeProduct(): Observable<ProductSingle>{
    return this.product$;
  }

  setProduct(id: number): void{
    this.productService.getSingleProductCustom(id).then(prod => {
      this.product$.next(prod);
    });
  }
}
