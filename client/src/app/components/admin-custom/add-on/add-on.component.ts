import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ListTableTh} from '../../../interfaces/list-table-th';
import {ProductAddOnTrTd, ProductAddOnInsert} from '../../../interfaces/product-add-on';
import {ListForm} from '../../../interfaces/list-form';
import {ProductAddOnService} from '../../../services/product-add-on.service';
import {ListFormType} from '../../../enums/list-form-type.enum';
import {ListService} from '../../../services/list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.scss']
})
export class AddOnComponent implements OnInit, OnDestroy {

  @ViewChild('productSelect') productSelect: HTMLSelectElement;

  constructor(private pAddOnService: ProductAddOnService, private listService: ListService) { }

  productList: {id: number, title: string}[] = [];

  toastActive = false;
  toastText = '';
  subscription: Subscription;
  selectedProductID = 0;
  chosenProductID: number;

  // for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Naziv'},
    {title: 'Opis'},
    {title: 'Cena'}
  ];
  tbTr: Array<ProductAddOnTrTd> = undefined;
  form: ListForm[] = [
    {
      key: 'name',
      type: ListFormType.INPUT_TEXT,
      required: true,
      label: 'Naziv',
      placeholder: 'Naziv'
    },
    {
      key: 'description',
      type: ListFormType.INPUT_TEXT,
      label: 'Opis',
      placeholder: 'Opis',
    },
    {
      key: 'price',
      type: ListFormType.INPUT_NUMBER,
      label: 'Cena',
      placeholder: 'BESPLATNO',
      additionalTxt: 'Za besplatno ostaviti prazno.'
    }
  ];


  ngOnInit(): void {
    this.getProducts();

    this.subscription = this.pAddOnService.subscribeAddOns().subscribe((arr: Array<ProductAddOnTrTd>) => {
      this.tbTr = (arr) ? arr : [];
      this.listService.setTrTd(this.tbTr);
    });
  }

  setSelectedProduct(value): void{
    this.selectedProductID = +value;
  }

  getProducts(): void{
    this.pAddOnService.getProducts().then(res => {
      this.productList = res;
    });
  }

  insertFunction(params: ProductAddOnInsert): void{
    this.pAddOnService.insert({
      ...params,
      productId: this.chosenProductID
    }).then(res => {
      if (res){
        this.toastText = 'Uspešno uneta novi dodatak!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno uneta novi dodatak! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  private refresh(): void{
    this.pAddOnService.refreshAll(this.chosenProductID);
  }

  updateFunction(params: [number, ProductAddOnInsert]): void{
    this.pAddOnService.update([...params, this.chosenProductID]).then((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno izmenjen dodatak!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno izmenjen dodatak! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  prepareEdit(id: number): void{
    this.pAddOnService.getSingle(id).then((res: ProductAddOnTrTd) => {
      this.listService.setSingleItem(res);
    });
  }

  deleteFunction(productAddOnId): void{
    this.pAddOnService.delete(productAddOnId).then((res) => {
      if (res){
        this.toastText = 'Uspešno obrisan dodatak!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno obrisana dodatak! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  private hideToast(): void{
    setTimeout(() => this.toastActive = false, 3000);
  }

  chooseProduct(): void{
    this.chosenProductID = this.selectedProductID;
    this.refresh();
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }
}
