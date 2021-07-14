import { Component, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service'
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  isMenuOpened!: boolean
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getIsMenuOpened().subscribe((val: boolean)=>{
      this.isMenuOpened = val
    })
  }

  triggerToggleMenuOpened(): void{
    this.adminService.setIsMenuOpened(!this.isMenuOpened)
  }

}
