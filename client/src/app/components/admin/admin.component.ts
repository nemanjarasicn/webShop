import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service'
import { User } from 'src/app/interfaces/user.interface'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isLoggedIn!: boolean 
  isMenuOpened: boolean = false
  user!: User | null
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    //first check JwT
    this.adminService.isAlreadyLogged().subscribe((res:[boolean, User | null]) =>{
      if(res[0] && res[1] !== null){
        this.isLoggedIn = true
        this.adminService.setUser(res[1])
      }else this.isLoggedIn = false
    })

    this.adminService.getIsMenuOpened().subscribe((val: boolean)=>{
      this.isMenuOpened = val
    })

    this.adminService.subscribeUser().subscribe((val: User | null) => this.user = val)
  }

  isLogedinChange($event: boolean):void {
    this.isLoggedIn = $event
  }

  toggleMenuOpened(): void{
    this.adminService.setIsMenuOpened(!this.isMenuOpened)
  }

}
