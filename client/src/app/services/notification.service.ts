import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notification} from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  notification$ = new BehaviorSubject<Notification>({active: false});


  subscribeNotification(): Observable<Notification>{
    return this.notification$;
  }

  hideNotification(): void{
    this.notification$.next({active: false});
  }

  showNotification(text: string): void{
    this.notification$.next({active: true, text});
  }
}
