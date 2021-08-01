import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountAsideModalService {
  private toggle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  subscribeToggle(): Observable<boolean>{
    return this.toggle$;
  }

  setToggleModal(value: boolean): void{
    this.toggle$.next(value);
  }
}
