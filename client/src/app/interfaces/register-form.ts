import {FormTypes} from '../enums/form-types.enum';
import {ValidatorFn} from '@angular/forms';

export interface RegisterForm {
  required?: boolean;
  name: string;
  label: string;
  placeholder?: string;
  type: FormTypes;
  validation?: ValidatorFn[];
  invalideFeedback?: string;
}

