import { ListFormType } from '../enums/list-form-type.enum';
import {FormControl} from '@angular/forms';
import {FormTypes} from '../enums/form-types.enum';

export interface ListForm {
    key: string;
    type: ListFormType;
    selectTableCall?: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    defaultValue?: string | number | boolean;
    validationPattern?: RegExp;
    validationMinLength?: number;
    validationMaxLength?: number;
    validationMin?: number;
    validationMax?: number;
    additionalTxt?: string;
    disabled?: boolean;
    options?: {label: string, value: string}[];
}

export interface CheckoutFormField {
  key: string;
  control: FormControl;
  label: string;
  inputType: FormTypes;
  parentClass?: string;
  required?: boolean;
  inputClass?: string;
}
