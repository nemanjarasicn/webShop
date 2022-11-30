import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormTypes} from '../../../enums/form-types.enum';
import {CheckoutFormField} from '../../../interfaces/list-form';
import {ProductAsideModal} from '../../../interfaces/product';
import {Subscription} from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {CartAsideProductService} from '../../../services/cart-aside-product.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  formCheckout = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    lastname: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(9),
      Validators.pattern(/^\d+$/)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
    address_note: new FormControl(null, [ Validators.maxLength(300)]),
    order_note: new FormControl(null, [ Validators.maxLength(300)]),
    paymentMethod: new FormControl(0, [ Validators.required]),
    discount: new FormControl(null),
    create_account: new FormControl(false),
  });

  inputTypeText = FormTypes.TEXT;
  inputTypeNumber = FormTypes.NUMBER;
  inputTxtArea = FormTypes.TXTAREA;
  inputTypeTel = FormTypes.EMAIL;
  inputTypeEmail = FormTypes.TEL;
  inputTypeRadio = FormTypes.RADIOBTN;
  inputTypeCheck  = FormTypes.CHECKBOX;

  formFields: CheckoutFormField[] = [
    {
      key: 'firstname',
      label: 'Ime',
      control: this.formCheckout.controls.firstname as FormControl,
      inputType: FormTypes.TEXT,
      parentClass: 'form-group col-md-6 col-sm-6 col-xs-12',
      required: true
    },
    {
      key: 'lastname',
      label: 'Prezime',
      control: this.formCheckout.controls.lastname as FormControl,
      inputType: FormTypes.TEXT,
      parentClass: 'form-group col-md-6 col-sm-6 col-xs-12',
      required: true
    },
    {
      key: 'phone',
      label: 'Broj telefona',
      control: this.formCheckout.controls.phone as FormControl,
      inputType: FormTypes.TEXT,
      parentClass: 'form-group col-md-12 col-sm-12 col-xs-12',
      required: true
    },
    {
      key: 'email',
      label: 'Email',
      control: this.formCheckout.controls.email as FormControl,
      inputType: FormTypes.TEXT,
      parentClass: 'form-group col-md-12 col-sm-12 col-xs-12',
      required: true
    },
    {
      key: 'address',
      label: 'Adresa za dostavu',
      control: this.formCheckout.controls.address as FormControl,
      inputType: FormTypes.TEXT,
      parentClass: 'form-group col-md-12 col-sm-12 col-xs-12',
      required: true
    },
    {
      key: 'address_note',
      label: 'Dodatne informacije o adresi',
      control: this.formCheckout.controls.address_note as FormControl,
      inputType: FormTypes.TXTAREA,
      parentClass: 'form-group col-md-12 col-sm-12 col-xs-12 textarea-container'
    },
    {
      key: 'create_account',
      label: 'Automatski kreiraj nalog',
      control: this.formCheckout.controls.create_account as FormControl,
      inputType: FormTypes.CHECKBOX,
      parentClass: 'form-group col-md-12 col-sm-12 col-xs-12',
    },
  ];

  products!: ProductAsideModal[];
  productsSum!: number;
  shipping!: number;
  cartTotal!: number;

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;

  constructor(
    private cartService: CartService,
    private cartAPService: CartAsideProductService
  ) { }

  ngOnInit(): void{
    this.subscription4 = this.cartAPService.subscribeProductsForCart().subscribe(res => {
      this.products = res || [];
    });

    this.subscription1 = this.cartService.subscribeProductSum().subscribe(res => {this.productsSum = res; });
    this.subscription2 = this.cartService.subscribeShipping().subscribe(res => {this.shipping = res; });
    this.subscription3 = this.cartService.subscribeCartTotal().subscribe(res => {this.cartTotal = res; });
  }

  ngOnDestroy(): void{
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
    this.subscription4?.unsubscribe();
  }

  submitForm(): void{
    console.log(this.formCheckout.controls);
    // this.cartService.submitOrder().then(res => {
    //
    // });
  }

  checkDiscount(): void{

  }
}
