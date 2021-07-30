import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, CategoryBasic, CategoryMenu } from '../interfaces/category';
import { Discount } from '../interfaces/discount';
import { ProductSingle, ProductTbTr, ProductWishlist } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products$: BehaviorSubject<ProductTbTr[]> = new BehaviorSubject(undefined)
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject(undefined)
  private parentCategories$: BehaviorSubject<{label: string, value: string}[]> = new BehaviorSubject(undefined)
  private discounts$: BehaviorSubject<Discount[]> = new BehaviorSubject(undefined)
  
  private endpoint = '/api/products/'
  constructor(private http: HttpClient) {}  

  //for admin
  subscribeCategories(): Observable<Category[]>{
    return this.categories$
  }

  refreshAllCategories(): Promise<any> {
    return this.http.post<Category[]>(
      this.endpoint + 'all_categories',
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
      this.endpoint + 'all_parent_categories',
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
      this.endpoint + 'single_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  insertCategory(params: Category): Observable<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'insert_category',
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
      this.endpoint + 'update_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteCategory(id: number): Observable<boolean>{
    const params = {
      id,
    }
    return this.http.post<boolean>(
      this.endpoint + 'delete_category',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteCategoryMedia(cat_id: number, media_id: number): Promise<boolean>{
    const params = {
      cat_id,
      media_id
    }
    return this.http.post<boolean>(
      this.endpoint + 'delete_cat_media',
      params,
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  //Discounts
  subscribeDiscounts(): Observable<Discount[]>{
    return this.discounts$
  }

  refreshAllDiscounts(): Promise<any> {
    return this.http.post<Discount[]>(
      this.endpoint + 'all_discounts',
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
      this.endpoint + 'single_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  insertDiscount(params: Discount): Observable<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'insert_discount',
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
      this.endpoint + 'update_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteDiscount(id: number): Observable<boolean>{
    const params = {
      id,
    }
    return this.http.post<boolean>(
      this.endpoint + 'delete_discount',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  //PRODUCTS
  subscribeProductCategories(): Promise<{label: string, value: string}[]>{
    return this.http.post<{label: string, value: string}[]>(
      this.endpoint + 'all_product_categories',
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  subscribeProductDiscounts(): Promise<{label: string, value: string}[]>{
    return this.http.post<{label: string, value: string}[]>(
      this.endpoint + 'all_product_discounts',
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  subscribeProducts(): Observable<ProductTbTr[]>{
    return this.products$
  }

  refreshAllProducts(): Promise<any> {
    return this.http.post<ProductTbTr[]>(
      this.endpoint + 'all_products',
      {headers: {'content-type': 'application/json'}}
    ).toPromise().then((result)=>{
      this.products$.next(result)
    })
  }

  getSingleProducts(id: number): Observable<ProductSingle>{
    const params = {
      id
    }
    return this.http.post<ProductSingle>(
      this.endpoint + 'single_product',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  insertProduct(params: ProductSingle): Observable<boolean>{
    return this.http.post<boolean>(
      this.endpoint + 'insert_product',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  updateProduct(xParams: [number, ProductSingle]): Observable<boolean>{
    const params = {
      id: xParams[0],
      ...xParams[1]
    }

    return this.http.post<boolean>(
      this.endpoint + 'update_product',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteProduct(id: number): Observable<boolean>{
    const params = {
      id,
    }
    return this.http.post<boolean>(
      this.endpoint + 'delete_product',
      params,
      {headers: {'content-type': 'application/json'}}
    )
  }

  deleteProductMedia(prod_id: number, media_id: number): Promise<boolean>{
    const params = {
      prod_id,
      media_id
    }
    return this.http.post<boolean>(
      this.endpoint + 'delete_prod_media',
      params,
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  //for shop
  getAllCategoriesMenu(): Promise<Array<CategoryMenu>>{
    return this.http.post<Array<CategoryMenu>>(
      this.endpoint + 'all_categories_menu',
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  getAllParentCategories(): Promise<Array<CategoryBasic>>{
    return this.http.post<Array<CategoryBasic>>(
      this.endpoint + 'all_parent_categories_view',
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  getCategoriesWithImg(): Promise<Array<CategoryBasic>>{
    return this.http.post<Array<CategoryBasic>>(
      this.endpoint + 'all_categories_with_img',
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  getActiveDiscounts(): Promise<Discount[]>{
    return this.http.post<Discount[]>(
      this.endpoint + 'get_all_active_discounts',
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  getAllProductByCustom(type: number, ids?: number[]): Promise<ProductSingle[] | ProductWishlist[]>{
    
    const params = {
      type,
      ids
    }    
    return this.http.post<ProductSingle[] | ProductWishlist[]>(
      this.endpoint + 'get_all_products_custom',
      params,
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }

  getSingleProductsCustom(id: number, type:number = 0): Promise<ProductSingle>{    
    const params = {
      id,
      type,
    }
    
    return this.http.post<ProductSingle>(
      this.endpoint + 'get_single_product_custom',
      params,
      {headers: {'content-type': 'application/json'}}
    ).toPromise()
  }
}
