import {Component, OnInit, Inject, Input, Output, EventEmitter} from '@angular/core';
import { ProductAsideModal } from '../../../interfaces/product';
import {DOCUMENT} from '@angular/common';
import {AsideModalTypes} from '../../../enums/aside-modal-types.enum';

@Component({
  selector: 'app-aside-modal-single-product',
  templateUrl: './aside-modal-single-product.component.html',
  styleUrls: ['./aside-modal-single-product.component.scss']
})
export class AsideModalSingleProductComponent implements OnInit {

  @Input() product!: ProductAsideModal;
  @Input() type!: AsideModalTypes;
  @Output() triggerTrash: EventEmitter<number> =  new EventEmitter<number>();
  @Output() triggerEdit: EventEmitter<number> =  new EventEmitter<number>();
  @Output() triggerAddToCart: EventEmitter<number> =  new EventEmitter<number>();
  qty = 1 as number;
  asideModaltypes =  AsideModalTypes;

  constructor(@Inject(DOCUMENT) private document: Document) { }
  ngOnInit(): void {
  }

  minusQty(): void{
    if (this.qty > 1) { this.qty -= 1; }
  }

  plusQty(): void{
    this.qty += 1;
  }

  trash(): void{
    this.triggerTrash.emit(this.product.id);
  }

  edit(): void{
    this.triggerEdit.emit(this.product.id);
  }

  addToCart(): void{
    this.triggerAddToCart.emit(this.product.id);
  }
}
