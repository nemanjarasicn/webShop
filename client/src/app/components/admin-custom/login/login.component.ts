import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() triggerIsLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private adminService: AdminService) { }

  toastActive = false;
  loginFrm: FormGroup = new FormGroup({
    username:  new FormControl('', Validators.required),
    password:  new FormControl('', Validators.required),
    save_me: new FormControl(0)
  });

  ngOnInit(): void {

  }

  loginFrmSubmit(): void{

    this.adminService.login(this.loginFrm.value).subscribe(
      (response: any) => {
        if (response.status === undefined){
          if (typeof response !== 'boolean') { this.successfullyLogin(response); }
          else { this.failedToLogin(); }
        }
      },
      (error) => {
        console.log('err');
      }
    );
  }

  successfullyLogin(user: IUser): void{
    this.adminService.setUser(user);
    this.triggerIsLogin.emit(true);
  }

  hideToast(): void{
    this.toastActive = false;
  }

  failedToLogin(): void{
    // add form reset
    this.toastActive = true;
  }
}
