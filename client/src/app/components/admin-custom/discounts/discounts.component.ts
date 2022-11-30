import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListTableTh } from 'src/app/interfaces/list-table-th';
import { ProductsService } from 'src/app/services/products.service';
import { Discount } from 'src/app/interfaces/discount';
import { ListForm } from 'src/app/interfaces/list-form';
import { ListFormType } from 'src/app/enums/list-form-type.enum';
import { ListService } from 'src/app/services/list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  toastActive = false;
  toastText = '';

  // for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Naziv'},
    {title: 'Vrednost (%)'},
    {title: 'Vazi od'},
    {title: 'Vazi do'},
    {title: 'Promo kod'},
    {title: 'Opis'}
  ];
  tbTr!: Array<Discount>;
  form: ListForm[] = [
    {
      key: 'name',
      type: ListFormType.INPUT_TEXT,
      label: 'Naziv',
      placeholder: 'Naziv',
      required: true,
    },
    {
      key: 'percentage_value',
      type: ListFormType.INPUT_NUMBER,
      label: 'Vrednost (%)',
      placeholder: 'Vrednost (%)',
      required: true,
      validationPattern: /^\d+$/,
      validationMaxLength: 3,
      validationMax: 100,
      validationMin: 1
    },
    {
      key: 'start_at',
      type: ListFormType.DATE,
      label: 'Vazi od',
      placeholder: 'Vazi od'
    },
    {
      key: 'end_at',
      type: ListFormType.DATE,
      label: 'Vazi do',
      placeholder: 'Vazi do'
    },
    {
      key: 'promo_code',
      type: ListFormType.INPUT_TEXT,
      label: 'Promo kod',
      placeholder: 'Promo kod'
    },
    {
      key: 'description',
      type: ListFormType.TEXTAREA,
      label: 'Opis',
      placeholder: 'Opis'
    }
  ];
  constructor(private productsService: ProductsService, private listService: ListService) {}

  ngOnInit(): void {
    this.productsService.refreshAllDiscounts().then(() => {
      this.subscription = this.productsService.subscribeDiscounts().subscribe((arr: Array<Discount>) => {
        this.tbTr = (arr) ? arr : [];
        this.listService.setTrTd(this.tbTr);
      });
    });

  }


  private refrash(): void{
    this.productsService.refreshAllDiscounts();
  }

  insertFunction(params: Discount): void{
    this.productsService.insertDiscount(params).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno uneta novi popust / akcija!';
        this.refrash();
      }
      else { this.toastText = 'Neuspešno uneta novi popust / akcija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  updateFunction(params: [number, Discount]): void{
    this.productsService.updateDiscount(params).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno izmenjen popust / akcija!';
        this.refrash();
      }
      else { this.toastText = 'Neuspešno izmenjen popust / akcija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  deleteFunction(id: number): void{
    this.productsService.deleteDiscount(id).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno obrisan popust / akcija!';
        this.refrash();
      }
      else { this.toastText = 'Neuspešno obrisan popust / akcija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  private hideToast(): void{
    setTimeout(() => this.toastActive = false, 3000);
  }

  prepareEdit(id: number): void{
    this.productsService.getSingleDiscount(id).toPromise().then((arr: Discount) => {
        this.listService.setSingleItem(arr);
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
