import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Discount } from '../interfaces/discount';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject(undefined)
  private parentCategories$: BehaviorSubject<{label: string, value: string}[]> = new BehaviorSubject(undefined)
  private discounts$: BehaviorSubject<Discount[]> = new BehaviorSubject(undefined)
  
  constructor(private http: HttpClient) {}  

  subscribeCategories(): Observable<Category[]>{
    return this.categories$
  }

  refreshAllCategories(): Promise<any> {
    return this.http.post<Category[]>(
      '/api/products/all_categories',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result)=>{
      this.categories$.next(result)
    })
  }

  subscribeParentCategories(): Observable<{label: string, value: string}[]>{
    return this.parentCategories$
  }

  refreshAllParentCategories(): Promise<any> {
    return this.http.post<{label: string, value: string}[]>(
      '/api/products/all_parent_categories',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result)=>{
      this.parentCategories$.next(result)
    })
  }

  getSingleCategory(id: number): Observable<Category>{
    const params = {
      id
    }
    return this.http.post<Category>(
      '/api/products/single_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  insertCategory(params: Category): Observable<boolean>{
    return this.http.post<boolean>(
      '/api/products/insert_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  updateCategory(xParams: [number, Category]): Observable<boolean>{
    const params = {
      id: xParams[0],
      ...xParams[1]
    }

    return this.http.post<boolean>(
      '/api/products/update_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteCategory(id: number): Observable<boolean>{
    const params = {
      id,
    }
    return this.http.post<boolean>(
      '/api/products/delete_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  //Discounts
  subscribeDiscounts(): Observable<Discount[]>{
    return this.discounts$
  }

  refreshAllDiscounts(): Promise<any> {
    return this.http.post<Discount[]>(
      '/api/products/all_discounts',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result)=>{
      this.discounts$.next(result)
    })
  }

  getSingleDiscount(id: number): Observable<Discount>{
    const params = {
      id
    }
    return this.http.post<Discount>(
      '/api/products/single_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  insertDiscount(params: Discount): Observable<boolean>{
    return this.http.post<boolean>(
      '/api/products/insert_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  updateDiscount(xParams: [number, Discount]): Observable<boolean>{
    const params = {
      id: xParams[0],
      ...xParams[1]
    }

    return this.http.post<boolean>(
      '/api/products/update_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteDiscount(id: number): Observable<boolean>{
    const params = {
      id,
    }
    return this.http.post<boolean>(
      '/api/products/delete_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }
}
