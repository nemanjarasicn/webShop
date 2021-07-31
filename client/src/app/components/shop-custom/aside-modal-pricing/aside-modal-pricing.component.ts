import {Component, OnInit, Input} from '@angular/core';
import {AsideModalTypes} from '../../../enums/aside-modal-types.enum';

@Component({
  selector: 'app-aside-modal-pricing',
  templateUrl: './aside-modal-pricing.component.html',
  styleUrls: ['./aside-modal-pricing.component.scss']
})
export class AsideModalPricingComponent implements OnInit {
  @Input() productsSum!: number;
  @Input() type: AsideModalTypes;
  shipping = 0 as number;
  asideModalTypes = AsideModalTypes;

  constructor() { }

  ngOnInit(): void {  }
}
