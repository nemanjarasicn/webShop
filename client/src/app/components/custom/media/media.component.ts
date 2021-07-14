import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListFormType } from 'src/app/enums/list-form-type.enum';
import { ListForm } from 'src/app/interfaces/list-form';
import { ListTableTh } from 'src/app/interfaces/list-table-th';
import { ListTableTr } from 'src/app/interfaces/list-table-tr';
import { Media, MediaTrTd } from 'src/app/interfaces/media';
import { ListService } from 'src/app/services/list.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {
  subscription: Subscription

  toastActive : boolean = false
  toastText: string = ''
  
  //for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Naziv'},
    {title: 'Src'},
    {title: 'Prikaz'},
    {title: 'Alt tekst'},
    {title: 'Tip'}
  ]
  tbTr!: Array<MediaTrTd>
  form: ListForm[] = []

  constructor(private mediaService: MediaService, private listService: ListService) {}

  ngOnInit(): void {
    this.mediaService.refreshAll().then(()=>{
      this.subscription = this.mediaService.subscribeAll().subscribe((arr: Array<MediaTrTd>)=>{
        this.tbTr = (arr)? arr: []
        this.listService.setTrTd(this.tbTr)
      })
    })
  }

  private refrash(): void{
    this.mediaService.refreshAll()
  }

  insertFunction(params :Media): void{
    this.mediaService.insert(params).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno uneta nova media!'
        this.refrash()
      }
      else this.toastText = 'Neuspešno uneta nova media! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  deleteFunction(id: number): void{
    this.mediaService.delete(id).subscribe((res: boolean)=>{
      if(res){
        this.toastText = 'Uspešno obrisana media!'
        this.refrash()
      } 
      else this.toastText = 'Neuspešno obrisana media! Molimo vas pokušajte kasnije.'

      this.toastActive = true
      this.hideToast()
    })
  }

  private hideToast(){
    setTimeout(()=>this.toastActive = false, 3000)
  }


  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }
}