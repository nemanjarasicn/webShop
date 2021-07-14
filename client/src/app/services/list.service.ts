import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService{

  singleItem$: BehaviorSubject<any> =  new BehaviorSubject(null)
  trTd$:BehaviorSubject<any> =  new BehaviorSubject(null)

  constructor() { }

  subscribeSingleItem(): Observable<any>{
    return this.singleItem$
  }

  setSingleItem(value: any): void{
    this.singleItem$.next(value)
  }

  subscribeTrTd(): Observable<any>{
    return this.trTd$
  }

  setTrTd(value: any): void{
    this.trTd$.next(value)
  }
}
