import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListTableTh } from 'src/app/interfaces/list-table-th';
import { ProductsService } from 'src/app/services/products.service';
import { ListForm } from 'src/app/interfaces/list-form';
import { ListFormType } from 'src/app/enums/list-form-type.enum';
import { ListService } from 'src/app/services/list.service';
import { Subscription } from 'rxjs';
import { ProductSingle, ProductTbTr } from 'src/app/interfaces/product'
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  toastActive : boolean = false
  toastText: string = ''

  //for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Glavna slika'},
    {title: 'Naziv'},
    {title: 'Kategorija'},
    {title: 'Originalna cena'},
    {title: 'Popust/Akcija'},
    {title: 'Cena sa popustom'},
    {title: 'Aktivan'},
    {title: 'Ocena'},
    {title: 'Galerija'}
  ]
  tbTr!: Array<ProductTbTr>
  form: ListForm[] = [
    {
      key: 'image',
      type: ListFormType.SINGLE_MEDIA,
      label: 'Dodaj glavnu sliku',
    },
    {
      key: 'name',
      type: ListFormType.INPUT_TEXT,
      label: 'Naziv',
      placeholder: 'Naziv',
      required: true,
    },
    {
      key: 'product_category_id',
      type: ListFormType.SELECT,
      label: 'Kategorija proizvoda',
      placeholder: 'Kategorija proizvoda'
    },
    {
      key: 'price',
      type: ListFormType.INPUT_NUMBER,
      label: 'Cena',
      placeholder: 'Cena',
      required: true,
    },
    {
      key: 'description',
      type: ListFormType.TEXTAREA,
      label: 'Opis',
    },
    {
      key: 'active',
      type: ListFormType.CHECKBOX,
      label: 'Aktivan',
      required: true,
      defaultValue: true
    },
    {
      key: 'featured',
      type: ListFormType.CHECKBOX,
      label: 'Istaknut',
    },
    {
      key: 'delivery_matter',
      type: ListFormType.CHECKBOX,
      label: 'Utiče na dostavu?',
      defaultValue: true,
      additionalTxt: 'Da li ovaj proizvod popunjava cenu do minimalne za cenu dostave?'
    },
    {
      key: 'unique_number',
      type: ListFormType.INPUT_TEXT,
      label: 'Vaš jedinstveni broj',
      placeholder: 'Vaš jedinstveni broj',
    },
    {
      key: 'barcode',
      type: ListFormType.INPUT_TEXT,
      placeholder: 'Barcode',
      label: 'Barcode',
    },
    {
      key: 'discount_id',
      type: ListFormType.SELECT,
      label: 'Popust/Akcija',
      placeholder: 'Popust/Akcija',
    },
    {
      key: 'gallery',
      type: ListFormType.GALLERY,
      label: 'Galerija',
    },    
  ]

  subscription1: Subscription
  constructor(private productsService: ProductsService, private listService: ListService) {}

  ngOnInit(): void {
    
    //get categories
    this.productsService.subscribeProductCategories().then((arr: {label: string, value: string}[])=>{
      if(arr) this.form[2].options = arr
    })
    
    //get doscounts
    this.productsService.subscribeProductDiscounts().then((arr: {label: string, value: string}[])=>{
      if(arr) this.form[10].options = arr
    })
    
    this.productsService.refreshAllProducts().then(()=>{
      this.subscription1 = this.productsService.subscribeProducts().subscribe((arr: Array<ProductTbTr>)=>{
        this.tbTr = (arr)? arr : []
        this.listService.setTrTd(this.tbTr)
      })
    })
  }

  private refrash(): void{
    this.productsService.refreshAllProducts()
  }

  insertFunction(params: ProductSingle): void{
    this.productsService.insertProduct(params).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno uneta nov proizvod!'
        this.refrash()
      }
      else this.toastText = 'Neuspešno uneta nov proizvod! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  updateFunction(params: [number, ProductSingle]): void{
    this.productsService.updateProduct(params).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno izmenjen proizvod!'
        this.refrash()
      } 
      else this.toastText = 'Neuspešno izmenjen proizvod! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  deleteFunction(id: number): void{
    this.productsService.deleteProduct(id).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno obrisan proizvod!'
        this.refrash()
      } 
      else this.toastText = 'Neuspešno obrisan proizvod! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  private hideToast(){
    setTimeout(()=>this.toastActive = false, 3000)
  }

  prepareEdit(id: number): void{
    this.productsService.getSingleProducts(id).toPromise().then((arr: ProductSingle)=>{
        this.listService.setSingleItem(arr)
    })
  }
  
  deleteMediaLink($event: {item_id: number, media_id: number}): void{
    this.productsService.deleteProductMedia($event.item_id, $event.media_id).then(res => {
      if(res){
        this.toastText = 'Uspešno obrisana slika proizvoda!'
        this.refrash()
      }
      else this.toastText = 'Neuspešno obrisana slika proizvoda! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  ngOnDestroy(): void{
    this.subscription1.unsubscribe()
  }

}
