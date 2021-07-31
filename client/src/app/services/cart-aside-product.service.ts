import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductAsideModal} from '../interfaces/product';
import {localStorageNames} from '../constants/localStorageNames';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartAsideProductService {
  private modalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private cartProducts$: BehaviorSubject<ProductAsideModal[]> = new BehaviorSubject<ProductAsideModal[]>([]);
  private cartProductsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private productService: ProductsService) {
    this.refreshCart();
  }

  refreshCart(): void{
    const IDsFromStorage = JSON.parse(localStorage[localStorageNames.cart] || [] ) as number[];
    this.productService.getAllProductByCustom(1, IDsFromStorage).then((prods: ProductAsideModal[]) => {
      this.cartProducts$.next(prods);
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

  setNewToCart(productID: number): void{
    // set to storage
    const tmp: number[] = JSON.parse(localStorage[localStorageNames.cart] || '[]');
    localStorage[localStorageNames.cart] = JSON.stringify([...tmp, productID]);
    // update observable
    this.refreshCart();
  }

  removeProductFromCart(productID: number): void {
    const tmp = JSON.parse(localStorage[localStorageNames.cart] || '[]') as number[];
    localStorage[localStorageNames.cart] = JSON.stringify(tmp.filter(p => p !== productID));
    // update observable
    this.refreshCart();
  }
}
