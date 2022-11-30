import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  active = false;
  text!: string;
  subscription: Subscription;
  timeout;
  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.subscription = this.notifService.subscribeNotification().subscribe(res => {
      this.active = res.active;
      this.text = res.text;

      if (this.active){
        this.timeout = setTimeout(() => {
          this.dismiss();
        }, 1400);
      }
    });
  }

  ngOnDestroy(): void{
    clearTimeout(this.timeout);
    this.subscription?.unsubscribe();
  }

  dismiss(): void{
    this.notifService.hideNotification();
    clearTimeout(this.timeout);
  }
}
