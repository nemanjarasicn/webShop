import { Injectable } from '@angular/core';
import {ProductAddOnInsert, ProductAddOnTrTd} from '../interfaces/product-add-on';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductAddOnService {
  private endpoint = '/api/product_add_on/';
  private addOns$: BehaviorSubject<ProductAddOnTrTd[]> = new BehaviorSubject(undefined);
  constructor(private http: HttpClient) { }

  refreshAll(productId: number): Promise<void> {
    return this.http.post<ProductAddOnTrTd[]>(
      this.endpoint + 'all',
      {productId},
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result) => {
      this.addOns$.next(result);
    });
  }

  subscribeAddOns(): Observable<ProductAddOnTrTd[]>{
    return this.addOns$;
  }

  getProducts(): Promise<{id: number, title: string}[]>{
    return this.http.post<{id: number, title: string}[]>(
      this.endpoint + 'getProducts',
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  fetchAll(productId: number): Promise<ProductAddOnTrTd[]>{
    return this.http.post<ProductAddOnTrTd[]>(
      this.endpoint + 'all',
      {
        productId
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  delete(productAddOnId: number): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'delete',
      {
        productAddOnId
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  insert(params: ProductAddOnInsert): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'insert',
      {
        ...params
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  update(params: [number, ProductAddOnInsert, number]): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'update',
      {
        id: params[0],
        ...params[1],
        productId: params[2]
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  getSingle(id: number): Promise<ProductAddOnTrTd>{
    return this.http.post<ProductAddOnTrTd>(
      this.endpoint + 'single',
      {
        id
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }
}
