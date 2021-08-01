import {RegisterForm} from '../interfaces/register-form';
import {FormTypes} from '../enums/form-types.enum';
import {Validators} from '@angular/forms';

export const registrationFormConst: RegisterForm[] = [
  {
    name: 'firstname',
    placeholder: 'Ime',
    label: 'Ime',
    required: true,
    type: FormTypes.TEXT,
  },
  {
    name: 'lastname',
    placeholder: 'Prezime',
    label: 'Prezime',
    required: true,
    type: FormTypes.TEXT,
  },
  {
    name: 'email',
    placeholder: 'Email',
    label: 'Email',
    required: true,
    type: FormTypes.EMAIL,
    validation: [
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ],
    invalideFeedback: 'Email mora da bude ispravan!'
  },
  {
    name: 'password',
    placeholder: 'Lozinka',
    label: 'Lozinka',
    required: true,
    type: FormTypes.PASSWORD,
    invalideFeedback: 'Minimum 8 karaktera!',
    validation: [
      Validators.minLength(8)
    ],
  },
  {
    name: 'password_confirm',
    placeholder: 'Ponovite lozinku',
    label: 'Ponovite lozinku',
    required: true,
    type: FormTypes.PASSWORD,
    invalideFeedback: 'Lozinke moraju da se poklapaju!'
  },
  {
    name: 'phone',
    placeholder: '06........',
    label: 'Broj telefona',
    required: true,
    type: FormTypes.TEXT,
    validation: [
      Validators.minLength(10),
      Validators.maxLength(10)
    ],
    invalideFeedback: 'Broj telefona mora da bude ispravan, 10 cifara!'
  }
];
