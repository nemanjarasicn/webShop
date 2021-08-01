import {Component, OnInit} from '@angular/core';
import {registrationFormConst} from '../../../constants/registrationForm';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {FormTypes} from '../../../enums/form-types.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  formTypes = FormTypes;
  formConst = registrationFormConst;
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, this.formConst[0]?.validation),
    lastname: new FormControl(null, this.formConst[1]?.validation),
    email: new FormControl(null, this.formConst[2]?.validation),
    password: new FormControl(null, this.formConst[3]?.validation),
    password_confirm: new FormControl(null, this.formConst[4]?.validation),
    phone: new FormControl(null, this.formConst[5]?.validation),
  }, this.passwordMatchValidator);
  ngOnInit(): void {

  }

  passwordMatchValidator(g: FormGroup): ValidationErrors{
    if (g.get('password').value === g.get('password_confirm').value && g.get('password_confirm').touched){
      g.get('password_confirm').setErrors(null);
      return null;
    }else{
      g.get('password_confirm').setErrors({err: true});
      return  {err: true};
    }
  }

  submit(): void{
    console.log(this.registerForm.value);
  }
}
