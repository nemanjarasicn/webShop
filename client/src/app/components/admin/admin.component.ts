import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  checkedLogged = false;
  isMenuOpened = false;
  user!: IUser | null;
  subscribe1: Subscription;
  subscribe2: Subscription;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.subscribe1 = this.adminService.subscribeUser().subscribe((val: IUser | null) => this.user = val);
    this.subscribe2 =  this.adminService.subscribeLogged().subscribe((val: boolean) => this.isLoggedIn = val);

    this.adminService.isAlreadyLogged().then(() => {
      this.checkedLogged = true;
    });


    this.adminService.getIsMenuOpened().subscribe((val: boolean) => {
      this.isMenuOpened = val;
    });

  }

  isLoggedInChange($event: boolean): void {
    this.isLoggedIn = $event;
  }

  toggleMenuOpened(): void{
    this.adminService.setIsMenuOpened(!this.isMenuOpened);
  }

  ngOnDestroy(): void{
    this.subscribe1?.unsubscribe();
    this.subscribe2?.unsubscribe();
  }
}
