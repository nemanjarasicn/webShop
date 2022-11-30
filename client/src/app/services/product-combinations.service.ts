import { Injectable } from '@angular/core';
import {
  ProductCombinationSingleDisplay, ProductCombinationSingleInsertUpdate, ProductCombinationTbTr
} from '../interfaces/product-combination';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCombinationsService {
  private endpoint = '/api/product_combinations/';
  private productCombination$: BehaviorSubject<ProductCombinationTbTr[]> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  subscribeAll(): Observable<ProductCombinationTbTr[]>{
    return this.productCombination$;
  }

  refreshAll(): Promise<void>{
    return this.http.post<ProductCombinationTbTr[]>(
      this.endpoint + 'getAll',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result) => {
      this.productCombination$.next(result);
    });
  }


  deleteImage(id: number): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'deleteImage',
      {id},
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  deleteItem(id: number): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'deleteItem',
      {id},
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  deleteCombination(id: number): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'delete',
      {id},
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  getSingle(id: number): Promise<ProductCombinationSingleDisplay>{
    return this.http.post<ProductCombinationSingleDisplay>(
      this.endpoint + 'getSingle',
      {id},
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  insert(params: ProductCombinationSingleInsertUpdate): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'insert',
      {
        media_id: params.media_id,
        productCombination: params.productCombination,
        items: params.items
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }

  update(params: ProductCombinationSingleInsertUpdate): Promise<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'update',
      {
        media_id: params.media_id,
        productCombination: params.productCombination,
        items: params.items
      },
      {headers: {'content-type': 'application/json'}}
    ).toPromise();
  }
}
