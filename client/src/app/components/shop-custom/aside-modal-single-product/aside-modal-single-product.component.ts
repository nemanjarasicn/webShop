import {Component, OnInit, Inject, Input, Output, EventEmitter} from '@angular/core';
import {ProductAsideModal, StorageProducts} from '../../../interfaces/product';
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
  @Output() triggerQty = new EventEmitter<StorageProducts>();
  @Output() triggerTrash = new EventEmitter<number>();
  @Output() triggerEdit = new EventEmitter<number>();
  @Output() triggerAddToCart = new EventEmitter<{id: number, name: string, qty: number}>();
  qty!: number;
  asideModalTypes =  AsideModalTypes;

  constructor(@Inject(DOCUMENT) private document: Document) { }
  ngOnInit(): void {
    this.qty = this.product?.qty || 1;
  }

  minusQty(): void{
    if (this.qty > 1) {
      this.qty -= 1;
    }

    this.triggerQty.emit({
      qty: this.qty,
      productID: this.product.id
    });
  }

  plusQty(): void{
    this.qty += 1;

    this.triggerQty.emit({
      qty: this.qty,
      productID: this.product.id
    });
  }

  trash(): void{
    this.triggerTrash.emit(this.product.id);
  }

  edit(): void{
    this.triggerEdit.emit(this.product.id);
  }

  addToCart(): void{
    this.triggerAddToCart.emit({
      id: this.product.id,
      name: this.product.name,
      qty: this.qty
    });
  }
}
