import { ListFormType } from "../enums/list-form-type.enum";

export interface ListForm {
    key: string,
    type: ListFormType,
    selectTableCall?: string,
    label: string,
    required?: boolean,
    placeholder?: string,
    defaultValue?: string,
    validationPatern?: RegExp,
    validationMinLength?: number,
    validationMaxLength?: number,
    validationMin?: number,
    validationMax?: number,
    options?: {label: string, value: string}[]
}
