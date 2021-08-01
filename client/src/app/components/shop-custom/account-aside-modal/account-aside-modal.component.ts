import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AccountAsideModalService} from '../../../services/account-aside-modal.service';

@Component({
  selector: 'app-account-aside-modal',
  templateUrl: './account-aside-modal.component.html',
  styleUrls: ['./account-aside-modal.component.scss']
})
export class AccountAsideModalComponent implements OnInit, OnDestroy {
  toggleModal = false as boolean;
  subscription1: Subscription;
  constructor(private accountAMService: AccountAsideModalService) { }

  ngOnInit(): void {
    this.subscription1 = this.accountAMService.subscribeToggle().subscribe(res => {
      this.toggleModal = res;
    });
  }

  closeAccountModal(): void{
    this.accountAMService.setToggleModal(false);
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
  }

}
