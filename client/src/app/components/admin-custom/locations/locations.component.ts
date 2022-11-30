import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListTableTh } from 'src/app/interfaces/list-table-th';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/interfaces/location';
import { ListForm } from 'src/app/interfaces/list-form';
import { ListFormType } from 'src/app/enums/list-form-type.enum';
import { ListService } from 'src/app/services/list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  toastActive = false;
  toastText = '';

  subscription: Subscription;

  // for now must be the same order like SELECT query
  tbTh: Array<ListTableTh> =  [
    {title: 'Naziv'},
    {title: 'Cena dostave'}
  ];
  tbTr!: Array<Location>;
  form: ListForm[] = [
    {
      key: 'name',
      type: ListFormType.INPUT_TEXT,
      label: 'Naziv',
      placeholder: 'Naziv',
      required: true,
    },
    {
      key: 'delivery_tax',
      type: ListFormType.INPUT_NUMBER,
      label: 'Cena dostave',
      placeholder: 'Cena dostave',
      validationMin: 0,
      validationPattern: /^\d+$/
    }
  ];
  constructor(private locationsService: LocationsService, private listService: ListService) {}

  ngOnInit(): void {
    this.locationsService.refreshAll().then(() => {
      this.subscription = this.locationsService.subscribeAll().subscribe((arr: Array<Location>) => {
        this.tbTr = (arr) ? arr : [];
        this.listService.setTrTd(this.tbTr);
      });
    });
  }


  private refresh(): void{
    this.locationsService.refreshAll();
  }

  insertFunction(params: Location): void{
    this.locationsService.insert(params).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno uneta nova lokacija!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno uneta nova lokacija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  updateFunction(params: [number, Location]): void{
    this.locationsService.update(params).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno izmenjena lokacija!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno izmenjena lokacija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  deleteFunction(id: number): void{
    this.locationsService.delete(id).subscribe((res: boolean) => {
      if (res){
        this.toastText = 'Uspešno obrisana lokacija!';
        this.refresh();
      }
      else { this.toastText = 'Neuspešno obrisana lokacija! Molimo vas pokušajte kasnije.'; }

      this.toastActive = true;
      this.hideToast();
    });
  }

  private hideToast(): void{
    setTimeout(() => this.toastActive = false, 3000);
  }

  prepareEdit(id: number): void{
    this.locationsService.getSingle(id).toPromise().then((arr: Location) => {
        this.listService.setSingleItem(arr);
    });
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }
}
