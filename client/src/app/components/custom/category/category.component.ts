import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListTableTdType } from 'src/app/enums/list-table-td-type.enum';
import { ListTableTd } from 'src/app/interfaces/list-table-td';
import { ListTableTh } from 'src/app/interfaces/list-table-th';
import { ListTableTr } from 'src/app/interfaces/list-table-tr';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/interfaces/category'
import { ListForm } from 'src/app/interfaces/list-form';
import { ListFormType } from 'src/app/enums/list-form-type.enum';
import { ListService } from 'src/app/services/list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  toastActive : boolean = false
  toastText: string = ''

  //for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Naziv'},
    {title: 'Istaknuto'},
    {title: 'Potpada pod'},
    {title: 'Slika'}
  ]
  tbTr!: Array<Category>
  form: ListForm[] = [
    {
      key: 'name',
      type: ListFormType.INPUT_TEXT,
      label: 'Naziv',
      placeholder: 'Naziv',
      required: true,
    },
    {
      key: 'featured',
      type: ListFormType.CHECKBOX,
      label: 'Istaknuto',
    },
    {
      key: 'parent_cat',
      type: ListFormType.SELECT,
      label: 'Potpada pod',
      placeholder: 'Potpada pod'
    },
    {
      key: 'category_media',
      type: ListFormType.SINGLE_MEDIA,
      label: 'Dodaj sliku',
    }
    
  ]

  subscription1: Subscription
  subscription2: Subscription
  constructor(private productsService: ProductsService, private listService: ListService) {}

  ngOnInit(): void {
    this.productsService.refreshAllCategories().then(()=>{
      this.subscription1 = this.productsService.subscribeCategories().subscribe((arr: Array<Category>)=>{
        this.tbTr = (arr)? arr : []
        this.listService.setTrTd(this.tbTr)
      })
    })

    this.productsService.refreshAllParentCategories().then(()=>{
      this.subscription2 = this.productsService.subscribeParentCategories().subscribe((arr: Array<{label: string, value: string}>)=>{
        if(arr) this.form[2].options = arr
      })
    })
  }

  private refrash(): void{
    this.productsService.refreshAllCategories()
    this.productsService.refreshAllParentCategories()
  }

  insertFunction(params: Category): void{
    this.productsService.insertCategory(params).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno uneta nova kategorija!'
        this.refrash()
      }
      else this.toastText = 'Neuspešno uneta nova kategorija! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  updateFunction(params: [number, Category]): void{
    this.productsService.updateCategory(params).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno izmenjena kategorija!'
        this.refrash()
      } 
      else this.toastText = 'Neuspešno izmenjena kategorija! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  deleteFunction(id: number): void{
    this.productsService.deleteCategory(id).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno obrisana kategorija!'
        this.refrash()
      } 
      else this.toastText = 'Neuspešno obrisana kategorija! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  private hideToast(){
    setTimeout(()=>this.toastActive = false, 3000)
  }

  prepareEdit(id: number): void{
    this.productsService.getSingleCategory(id).toPromise().then((arr: Category)=>{
        this.listService.setSingleItem(arr)
    })
  }

  ngOnDestroy(): void{
    this.subscription1.unsubscribe()
    this.subscription2.unsubscribe()
  }
}
