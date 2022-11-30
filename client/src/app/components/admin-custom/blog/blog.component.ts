import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ListTableTh} from '../../../interfaces/list-table-th';
import {ListForm} from '../../../interfaces/list-form';
import {ListFormType} from '../../../enums/list-form-type.enum';
import {ListService} from '../../../services/list.service';
import {BlogService} from '../../../services/blog.service';
import {BlogTbTr} from '../../../interfaces/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  toastActive = false;
  toastText = '';

  subscription: Subscription;

  constructor(
    private blogService: BlogService,
    private listService: ListService
  ) { }

  // for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Slika'},
    {title: 'Naslov'},
    {title: 'Kratak opis'},
    {title: 'Sadržaj'},
    {title: 'Datum objave'}
  ];
  tbTr!: Array<BlogTbTr>;
  form: ListForm[] = [
    {
      key: 'image',
      type: ListFormType.SINGLE_MEDIA,
      label: 'Dodaj glavnu sliku',
    },
    {
      key: 'title',
      type: ListFormType.INPUT_TEXT,
      label: 'Naslov',
      placeholder: 'Naslov',
      required: true,
    },
    {
      key: 'short_desc',
      type: ListFormType.INPUT_TEXT,
      label: 'Kratak opis',
      placeholder: 'Kratak opis',
      validationMaxLength: 256,
      required: true,
    },
    {
      key: 'content',
      type: ListFormType.TEXTAREA,
      label: 'Sadržaj',
      placeholder: 'Sadržaj',
      required: true,
    },
    {
      key: 'published_date',
      type: ListFormType.INPUT_TEXT,
      label: 'Datum objave',
      defaultValue: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      disabled: true
    },
  ];

  ngOnInit(): void {
    this.blogService.refreshAll().then(() => {
      this.subscription = this.blogService.subscribeAll().subscribe((res: Array<BlogTbTr>) => {
        this.tbTr = (res) ? res : [];
        this.listService.setTrTd(this.tbTr);
      });
    });
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  private refresh(): void{
    this.blogService.refreshAll();
  }

  deleteMediaLink(params: {
    item_id: number,
    media_id: number
  }): void{
    this.blogService.deleteMainImage(params.item_id, params.media_id).then(res => {
      if (res){
        this.toastText = 'Uspešno obrisana glavna slika!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno obrisana glavna slika! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  insertFunction(params: BlogTbTr): void{
    this.blogService.insert(params).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno unet novi blog!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno unet novi blog! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  updateFunction(params: [number, BlogTbTr]): void{
    this.blogService.update(params).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno izmenjen blog!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno izmenjen blog! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  deleteFunction(id: number): void{
    this.blogService.delete(id).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno obrisan blog!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno obrisan blog! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  private hideToast(): void{
    setTimeout(() => this.toastActive = false, 3000);
  }

  prepareEdit(id: number): void{
    this.blogService.getSingle(id).then((res: BlogTbTr) => {
      this.listService.setSingleItem(res);
    });
  }

}
