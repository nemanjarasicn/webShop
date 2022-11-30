import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductAsideModal, StorageProducts} from '../interfaces/product';
import {localStorageNames} from '../constants/localStorageNames';
import {ProductsService} from './products.service';
import {StorageService} from './storage.service';
import {NotificationService} from './notification.service';
import {ProductEnumSingleArr} from '../../../../routes/enums/product-enum';

@Injectable({
  providedIn: 'root'
})
export class CartAsideProductService {
  private modalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private cartProducts$: BehaviorSubject<ProductAsideModal[]> = new BehaviorSubject<ProductAsideModal[]>([]);
  private cartProductsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private storageService: StorageService,
    private productService: ProductsService,
    private notificationService: NotificationService
  ) {
    this.refreshCart();
  }

  refreshCart(): void{
    const storageProducts = localStorage[localStorageNames.cart] ?
      JSON.parse(localStorage[localStorageNames.cart]) :
      [] as StorageProducts[];

    this.productService.getAllProductByCustom(ProductEnumSingleArr.CART_WISHLIST, {ids: storageProducts?.map(p => p.productID) || []}).then((prods: ProductAsideModal[]) => {
      this.cartProducts$.next(prods.map((p) => {
        p.qty = storageProducts.find(sp => sp.productID === p.id)?.qty || 1;

        return p;
      }));

      this.cartProductsCount$.next(prods.length);
    });
  }

  subscribeCartProductsCount(): Observable<number>{
    return this.cartProductsCount$;
  }

  subscribeToggleModal(): Observable<boolean>{
    return this.modalActive$;
  }

  setToggleModal(value: boolean): void{
    this.modalActive$.next(value);
  }

  subscribeProductsForCart(): Observable<ProductAsideModal[]>{
    return this.cartProducts$;
  }

  updateStorageQty(param: StorageProducts): void{
    const tmp =  this.storageService.getStorage(localStorageNames.cart);
    this.storageService.setStorage(
      localStorageNames.cart,
      tmp.map(p => {
        if (p.productID === param.productID) { p.qty = param.qty; }

        return {
          productID: p.productID,
          qty: p.qty
        };
      })
    );

    this.refreshCart();
  }

  setNewToCart(param: StorageProducts): void{
    const tmp = this.storageService.getStorage(localStorageNames.cart) as StorageProducts[];

    // if it's already there
    if (tmp.find(p => p.productID === param.productID)){
      this.storageService.setStorage(
        localStorageNames.cart,
        tmp.map(p => {
          if (p.productID === param.productID) { p.qty += param.qty; }

          return {
            productID: p.productID,
            qty: p.qty
          };
        })
      );
    }
    else {
      this.storageService.setStorage(localStorageNames.cart, [ ...tmp, {productID: param.productID, qty: param?.qty || 1}]);
    }

    // update observable
    this.refreshCart();

    this.notificationService.showNotification('Dodat novi proizvod u korpu');
  }

  removeProductFromCart(productID: number): void {
    const tmp = this.storageService.getStorage(localStorageNames.cart);
    this.storageService.setStorage(localStorageNames.cart, tmp.filter(p => p.productID !== productID));

    // update observable
    this.refreshCart();

    this.notificationService.showNotification('Proizvod obrisan iz korpe');
  }
}
