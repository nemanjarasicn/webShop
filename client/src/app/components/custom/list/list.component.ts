import { Component, OnDestroy, OnInit, Input, ViewChild, ChangeDetectorRef, EventEmitter, Output, ElementRef } from '@angular/core';
import { ListTableTh } from 'src/app/interfaces/list-table-th';
import { ListTableTr } from 'src/app/interfaces/list-table-tr';
import { ListTableTdType } from 'src/app/enums/list-table-td-type.enum'
import { ListFormType } from 'src/app/enums/list-form-type.enum'
import { ListForm } from 'src/app/interfaces/list-form';
import { ListService } from 'src/app/services/list.service'
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, ValidatorFn} from '@angular/forms';
import { ListTableTd } from 'src/app/interfaces/list-table-td';
import { MediaService } from 'src/app/services/media.service';
import { DataTableDirective } from 'angular-datatables';
import { PickMedia } from 'src/app/interfaces/pick-media';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnDestroy, OnInit {
  @Input() title: string
  @Input() addNewTitle: string
  
  @Input() tbTh!: ListTableTh
  @Input() tbTrDummy!: Array<any>
  
  tbTr!: Array<ListTableTr>
  
  @Input() form: ListForm[]

  @Output() triggerInsert: EventEmitter<any> = new EventEmitter
  @Output() triggerUpdate: EventEmitter<any> = new EventEmitter
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter
  @Output() triggerPrepareEdit: EventEmitter<any> = new EventEmitter
  @Output() triggerListFormSubmit: EventEmitter<{api_action: string, values: []}> = new EventEmitter()

  @ViewChild('formListModalCloseBtn') formListModalCloseBtn: ElementRef;
  @ViewChild('deleteListModalCloseBtn') deleteListModalCloseBtn: ElementRef;
  @ViewChild('closePickMedia') closePickMedia: ElementRef

  //list form types
  inputTextType: ListFormType = ListFormType.INPUT_TEXT
  inputNumberType: ListFormType = ListFormType.INPUT_NUMBER
  checkboxType: ListFormType = ListFormType.CHECKBOX
  selectType: ListFormType = ListFormType.SELECT
  singleMediaType: ListFormType = ListFormType.SINGLE_MEDIA
  dateType: ListFormType = ListFormType.DATE

  //list table td types
  tdTextType: ListTableTdType = ListTableTdType.TEXT
  tdIconType: ListTableTdType = ListTableTdType.ICON
  tdImageType: ListTableTdType = ListTableTdType.IMAGE

  listForm!: FormGroup
  medias: PickMedia[] = []
  selectedMedia: PickMedia | null = null
  containMedia: boolean = false
  itemID: number = null
  formListModalRef: ElementRef
  imgKey: string
  mediaOptions: {id: number, label: string}[] = []

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  subsctiption: Subscription
  subsctiption2: Subscription
  subsctiption3: Subscription
  constructor(private cd: ChangeDetectorRef, private listService: ListService, private mediaService: MediaService) {}

  ngOnInit(): void {
    this.subsctiption2 = this.listService.subscribeTrTd().subscribe((tbTrDummy)=>{
      this.makeTrTd(tbTrDummy)
    })

    this.subsctiption3 = this.listService.subscribePickMedia().subscribe(res=>{
      this.selectedMedia = res
    })
    

    if(this.form?.length > 0){
      let frmGroup = {}
      
      this.form.forEach(element => {
        let validators: ValidatorFn[] = []
        if(element?.validationPatern) validators.push(Validators.pattern(element.validationPatern))
        if(element?.validationMaxLength) validators.push(Validators.maxLength(element.validationMaxLength))
        if(element?.validationMinLength) validators.push(Validators.minLength(element.validationMinLength))
        if(element?.validationMax) validators.push(Validators.max(element.validationMax))
        if(element?.validationMin) validators.push(Validators.min(element.validationMin))
  
        frmGroup[element.key] = (validators.length > 0)? 
          new FormControl(element.defaultValue || null, validators) :
          new FormControl(element.defaultValue || null)
      });
      this.listForm = new FormGroup(frmGroup)
    }else{
      this.listForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        file: new FormControl(null, [Validators.required]),
        type_id: new FormControl(null, [Validators.required]),
        alt_text: new FormControl(null, [Validators.required])
      })

      this.mediaService.getTypes().subscribe((res: {id: number, label: string}[])=>{
        this.mediaOptions = res
      })
    }

    this.subsctiption = this.listService.subscribeSingleItem().subscribe((value)=>{
      if(value !== null){
        for (const key in value) {
          if(key === 'id') this.itemID = value[key]
          else if(key === 'active' || key === 'featured') this.listForm.get(key).setValue(!!value[key])
          else if(key.includes('image')){ 
            this.imgKey = key
            
            if(value[key] !== null && value[key]?.length > 0) this.medias.push(...value[key])
            else this.medias = []
          }
          else this.listForm.get(key).setValue(value[key])
        }
      }
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language:{
        search: 'Pretraži',
        lengthMenu: "Prikaži _MENU_ stavki po stranici",
        zeroRecords: "Ništa nije pronađeno",
        info: "Prikazuje se _PAGE_ od _PAGES_",
        infoEmpty: "Nema podataka",
        infoFiltered: "(filtrirano od _MAX_ ukupnih stavki)",
        loadingRecords: "Učitava se...",
        processing: "Obrađuje se...",
        paginate: {
          first: "Prva",
          last: "Poslednja",
          next: "Sledeća",
          previous: "Prošla"
        },
        aria: {
            sortAscending: ": aktiviraj rastuće sortiranje kolona ",
            sortDescending: ": aktiviraj opadajuće sortiranje kolona"
        }
      }
    };
  }

  makeTrTd(arr: Array<any>): void{
    if(arr.length > 0){
      this.tbTr = []

      arr.forEach(element => {
        let tds: Array<ListTableTd> = []
        let itemId: number = 0

        for (const key in element) {
          let type: ListTableTdType = null
          let value: string = null
          
          if(key === 'id') itemId = element[key]
          else {
            value = element[key]
            if(key === 'image'){ 
              this.containMedia = true
              type = ListTableTdType.IMAGE 
            }
            else if(key === 'active' || key === 'featured') type = ListTableTdType.ICON
            else type = ListTableTdType.TEXT 
            tds.push({
              value,
              type
            })
          }
        }

        this.tbTr.push({
          itemId,
          tds
        })
      });
    }else this.tbTr = []
  }

  resetForm(): void{
    this.listForm.reset()
    this.resetId()
  }

  ngAfterViewInit(): void{
    this.dtTrigger.next()
    this.cd.detectChanges()
  }

  frmSubmit(): void{    
    if(this.itemID === null) this.triggerInsert.emit(this.listForm.value)
    else this.triggerUpdate.emit([this.itemID, this.listForm.value])
    this.dtRerender()

    this.formListModalCloseBtn?.nativeElement?.click()
  }

  editItem(id: number): void{
    this.itemID = id
    this.triggerPrepareEdit.emit(id)
  }

  deleteItem(): void{
    this.triggerDelete.emit(this.itemID)
    this.dtRerender()

    this.deleteListModalCloseBtn.nativeElement.click()
  }
  
  showDeleteModal(id: number): void{
    this.itemID = id
  }

  resetId(): void{
    this.itemID = null
  }

  fileChange($event) {
    let file = $event.target.files[0]
    this.listForm.controls['file'].setValue(file ? file : '')
  } 

  showFullMedia(srcArr: string[]): void{
    this.mediaService.setShowFullMediaActiveArr(srcArr)
  }
  
  removeMediaFromArr(index):void{
    this.medias.splice(index, 1)
  }

  chooseMedia(): void{
    this.medias.push(this.selectedMedia)
    
    //set value to form control
    this.listForm.controls[this.imgKey].setValue(this.medias)

    //close modal
    this.closePickMedia.nativeElement.click()

    //reset
    this.listService.setPickMedia(null)
  }

  dtRerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      setTimeout(()=>{
        this.dtTrigger.next();
      },100)
    });
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe()
    this.subsctiption.unsubscribe()
    this.subsctiption2.unsubscribe()
    this.subsctiption3.unsubscribe()
    this.listService.setSingleItem(null)
  }
}
