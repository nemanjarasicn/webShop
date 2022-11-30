import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productSum$ = new BehaviorSubject<number>(0);
  cartTotal$ = new BehaviorSubject<number>(0);
  shipping$ = new BehaviorSubject<number>(800);

  constructor() { }

  subscribeProductSum(): Observable<number>{
    return this.productSum$;
  }

  subscribeCartTotal(): Observable<number>{
    return this.cartTotal$;
  }

  subscribeShipping(): Observable<number>{
    return this.shipping$;
  }

  setProductSum(value: number): void{
    this.productSum$.next(value);
  }

  setCartTotal(value: number): void{
    this.cartTotal$.next(value);
  }

  setShipping(value: number): void{
    this.shipping$.next(value);
  }

  // submitOrder(): Promise<boolean>{
  //   return false;
  // }
}
