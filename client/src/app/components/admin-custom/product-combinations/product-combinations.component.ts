import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCombinationItem, ProductCombinationTbTr} from '../../../interfaces/product-combination';
import {ProductSingle} from '../../../interfaces/product';
import {ProductsService} from '../../../services/products.service';
import {Subscription} from 'rxjs';
import {ListService} from '../../../services/list.service';
import {PickMedia} from '../../../interfaces/pick-media';
import {MediaService} from '../../../services/media.service';
import {ListTableTh} from '../../../interfaces/list-table-th';
import {ProductCombinationsService} from '../../../services/product-combinations.service';

@Component({
  selector: 'app-product-combinations',
  templateUrl: './product-combinations.component.html',
  styleUrls: ['./product-combinations.component.scss']
})
export class ProductCombinationsComponent implements OnInit, OnDestroy {

  @ViewChild('closePickMedia') closePickMedia: ElementRef;

  constructor(
    private productService: ProductsService,
    private listService: ListService,
    private mediaService: MediaService,
    private productCombinationService: ProductCombinationsService
  ) { }

  tbTh: Array<ListTableTh> =  [
    {title: 'Slika'},
    {title: 'Naziv'},
    {title: 'Cena'},
    {title: 'Aktivan'},
    {title: 'Opis'}
  ];
  tbTr!: Array<ProductCombinationTbTr>;
  activeTab = 0;
  subscription: Subscription;
  subscription2: Subscription;
  products!: ProductSingle[];
  toastActive = false;
  toastText: string;
  productOptions: {label: string, value: string}[];
  combinationForm!: FormGroup;
  productList: ProductCombinationItem[] = [];
  productListNew: ProductCombinationItem[] = [];
  productListOld: ProductCombinationItem[] = [];
  selectedMedia: PickMedia;
  media: PickMedia;

  ngOnInit(): void {
    this.productCombinationService.refreshAll().then(() => {
      this.subscription = this.productCombinationService.subscribeAll().subscribe((arr: Array<ProductCombinationTbTr>) => {
        this.tbTr = (arr) ? arr : [];
        this.listService.setTrTd(this.tbTr);
      });
    });

    this.productService.getAllProductByCustom().then((res: ProductSingle[]) => {
      this.products = res;
      this.productOptions = res?.length > 0 ?
        res.map((p: ProductSingle) => {
          return{label: p.name, value: String(p.id)};
        }) : [];
    });

    this.subscription2 = this.listService.subscribePickMedia().subscribe(res => {
      this.media = res;
    });

    this.combinationForm = new FormGroup(
      {
        id: new FormControl(null),
        name: new FormControl(null, [Validators.required]),
        active: new FormControl(true, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        selectProduct: new FormControl(null),
        description: new FormControl(null)
      }
    );
  }

  setActiveTab(tab: number): void{
    if (tab === 0) { this.refresh(); }
    this.activeTab = tab;
  }

  undoMedia(): void{
    if (this.combinationForm.get('id').value && this.selectedMedia?.id) { this.deleteImage(this.selectedMedia.id); }
    this.selectedMedia = null;
  }

  showFullMedia(srcArr: string[]): void{
    this.mediaService.setShowFullMediaActiveArr(srcArr);
  }

  chooseMedia(): void {
    // set value to form control
    this.selectedMedia = this.media;

    // close modal
    this.closePickMedia.nativeElement.click();

    // reset
    this.listService.setPickMedia(null);
  }

  setProductList(): void{
    this.productList = [...this.productListOld, ...this.productListNew];
  }

  addProductToList(): void{
    this.productListNew.push({
      product: this.products.find(p => +p.id === +this.combinationForm.get('selectProduct').value),
      count: 1
    });

    this.setProductList();
  }

  removeProductFromList(productId: number): void{
    this.productListNew = this.productListNew.filter(p =>
      +p.product.id !== productId
    );

    this.setProductList();
  }

  changeCountProductList(index: number, count: number): void{
    this.productList[index].count = count;
  }

  openNew(): void{
    this.setActiveTab(1);
  }

  resetVars(): void{
    this.productListNew = [];
    this.productListOld = [];
    this.productList = [];
    this.combinationForm.reset();
    this.selectedMedia = undefined;
  }

  save(): void{
    const afterSave = (res) => {
      if (res){
        this.toastText = 'Uspešno sačuvana kombinacija!';
        this.refresh();
        this.setActiveTab(0);
        this.resetVars();
      }
      else { this.toastText = 'Neuspešno sačuvana kombinacija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    };

    if (this.combinationForm.get('id').value){
      this.productCombinationService.update({
        productCombination: {
          id: this.combinationForm.get('id').value,
          name: this.combinationForm.get('name').value,
          price: this.combinationForm.get('price').value,
          active: this.combinationForm.get('active').value,
          description: this.combinationForm.get('description').value,
        },
        media_id: this.selectedMedia?.id,
        items: this.productListNew.map(item => {
          return {
            id: item.id,
            product_id: item.product.id,
            product_combinations_id: this.combinationForm.get('id').value,
            count: item.count
          };
        }),
      }).then(res => afterSave(res));
    }else{
      this.productCombinationService.insert({
        productCombination: {
          name: this.combinationForm.get('name').value,
          price: this.combinationForm.get('price').value,
          active: this.combinationForm.get('active').value,
          description: this.combinationForm.get('description').value,
        },
        media_id: this.selectedMedia?.id,
        items: this.productListNew.map(item => {
          return {
            id: item.id,
            product_id: item.product.id,
            count: item.count
          };
        }),
      }).then(res => afterSave(res));
    }
  }

  private refresh(): void{
    this.productCombinationService.refreshAll();
  }

  deleteImage(productCombinationId: number): void{
    this.productCombinationService.deleteImage(productCombinationId).then(res => {
      if (res){
        this.toastText = 'Uspešno obrisana kombinacija!';
      }
      else { this.toastText = 'Neuspešno obrisana kombinacija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  deleteItem(productCombinationItemId: number, productId: number): void{
    this.productCombinationService.deleteItem(productCombinationItemId).then(res => {
      if (res){
        this.toastText = 'Uspešno obrisan proizvod sa kombinacije!';
        this.productListOld = this.productListOld.filter(p =>
          +p.product.id !== productId
        );

        this.setProductList();
      }
      else { this.toastText = 'Neuspešno obrisan proizvod sa kombinacije! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  // TODO minimize
  setForm(params: ProductCombinationTbTr): void{
    this.combinationForm.get('id').setValue(params.id);
    this.combinationForm.get('name').setValue(params.name);
    this.combinationForm.get('price').setValue(params.price);
    this.combinationForm.get('description').setValue(params.description);
    this.combinationForm.get('active').setValue(!!params.active);
  }

  prepareEdit(productCombinationId: number): void{
    this.productCombinationService.getSingle(productCombinationId).then(res => {
      this.setForm(res.productCombination);

      this.productListOld = res.items;
      this.setProductList();

      if (res.media?.id){
        this.selectedMedia = {
          id: res.media.id,
          src_name: res.media.src_name,
          alt_text: res.media?.alt_text,
        };
      }

      this.setActiveTab(1);
    });
  }

  deleteFunction(productCombinationId: number): void{
    this.productCombinationService.deleteCombination(productCombinationId).then(res => {
      if (res){
        this.toastText = 'Uspešno obrisana kombinacija!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno obrisana kombinacija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  private hideToast(): void{
    setTimeout(() => this.toastActive = false, 3000);
  }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
      this.subscription2?.unsubscribe();
    }
}
