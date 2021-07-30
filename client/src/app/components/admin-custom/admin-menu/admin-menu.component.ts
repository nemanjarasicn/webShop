import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface'
import { AdminService } from 'src/app/services/admin.service'
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  isMenuOpened!: boolean; 
  isProductsMenuActive: boolean = false
  user!: User

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.subscribeUser().subscribe((val: User | null)=>{
      if(val !== null && val !== undefined) this.user = val
    })

    this.adminService.getIsMenuOpened().subscribe((val: boolean)=>{
      this.isMenuOpened = val
    })
  }

  logout(): void{
    this.adminService.logout().then((res)=>{
      console.log(res)
      if(res === true){
        this.adminService.setLogged(false)
        this.adminService.setUser(null)        
      }  
    })
  }

  deactiveProductsMenu() : void{
    this.isProductsMenuActive = false
  }
  
  activeProductsMenu(): void{
    this.isProductsMenuActive = true
  }

}
