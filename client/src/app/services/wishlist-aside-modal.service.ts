import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductWishlist } from '../interfaces/product';
import { ProductsService } from './products.service';
import {localStorageNames} from '../constants/localStorageNames';

@Injectable({
  providedIn: 'root'
})
export class WishlistAsideModalService {

  private modalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private wishlistProducts$: BehaviorSubject<ProductWishlist[]> = new BehaviorSubject<ProductWishlist[]>([]);
  private wishlistProductsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private productService: ProductsService) {

    // get from storage
    this.refreshProductsWishlist();
  }

  subscribeWishlistProductsCount(): Observable<number>{
    return this.wishlistProductsCount$;
  }

  subscribeToggleModal(): Observable<boolean>{
    return this.modalActive$;
  }

  setToggleModal(value: boolean): void{
    this.modalActive$.next(value);
  }

  subscribeProductsForWishlist(): Observable<ProductWishlist[]>{
    return this.wishlistProducts$;
  }

  refreshProductsWishlist(): void{
    // get from storage and update observable
    const IDsFromStorage = JSON.parse(localStorage[localStorageNames.wishlist] || null) as number[];
    // @ts-ignore
    this.productService.getAllProductByCustom(1, IDsFromStorage).then((prods: ProductWishlist[]) => {
      // @ts-ignore
      this.wishlistProducts$.next(prods);
      this.wishlistProductsCount$.next(prods.length);
    });
  }

  setNewToWishlist(productID: number): void{
    // set to storage
    const tmp: number[] = JSON.parse(localStorage[localStorageNames.wishlist] || '[]');
    localStorage[localStorageNames.wishlist] = JSON.stringify([...tmp, productID]);
    // update observable
    this.refreshProductsWishlist();
  }

  removeProductFromWL(productID: number): void {
    const tmp = JSON.parse(localStorage[localStorageNames.wishlist] || '[]') as number[];
    localStorage[localStorageNames.wishlist] = JSON.stringify(tmp.filter(p => p !== productID));
    // update observable
    this.refreshProductsWishlist();
  }
}
