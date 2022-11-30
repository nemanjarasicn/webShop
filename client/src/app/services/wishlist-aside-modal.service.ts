import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {ProductAsideModal} from '../interfaces/product';
import { ProductsService } from './products.service';
import {localStorageNames} from '../constants/localStorageNames';
import {NotificationService} from './notification.service';
import {ProductEnumSingleArr} from '../../../../routes/enums/product-enum';

@Injectable({
  providedIn: 'root'
})
export class WishlistAsideModalService {

  private modalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private wishlistProducts$: BehaviorSubject<ProductAsideModal[]> = new BehaviorSubject<ProductAsideModal[]>([]);
  private wishlistProductsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private productService: ProductsService,
    private notificationService: NotificationService
  ) {

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

  subscribeProductsForWishlist(): Observable<ProductAsideModal[]>{
    return this.wishlistProducts$;
  }

  refreshProductsWishlist(): void{
    // get from storage and update observable
    const storageProducts = JSON.parse(localStorage[localStorageNames.wishlist] || null) as number[];

    this.productService.getAllProductByCustom(ProductEnumSingleArr.CART_WISHLIST, {ids: storageProducts || []})
    .then((prods: ProductAsideModal[]) => {
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

    this.notificationService.showNotification('Proizvod dodat u listu želja');
  }

  removeProductFromWL(productID: number): void {
    const tmp = JSON.parse(localStorage[localStorageNames.wishlist] || '[]') as number[];
    localStorage[localStorageNames.wishlist] = JSON.stringify(tmp.filter(p => p !== productID));
    // update observable
    this.refreshProductsWishlist();

    this.notificationService.showNotification('Proizvod obrisan sa liste želja');
  }
}
