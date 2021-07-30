import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaPick } from 'src/app/interfaces/media';
import { PickMedia } from 'src/app/interfaces/pick-media';
import { ListService } from 'src/app/services/list.service';
import { MediaService } from 'src/app/services/media.service';


@Component({
  selector: 'app-pick-media',
  templateUrl: './pick-media.component.html',
  styleUrls: ['./pick-media.component.scss']
})
export class PickMediaComponent implements OnInit, OnDestroy {

  constructor(private mediaService: MediaService, private listService: ListService) { }

  images: MediaPick[]
  selectedImg!: PickMedia | null
  subscription: Subscription

  ngOnInit(): void {
    this.subscription = this.listService.subscribePickMedia().subscribe(res=>{
      this.selectedImg = res
    })

    this.mediaService.getPickAll().then(res =>{
      this.images = res
    })
  }

  pickImage(image): void{
    this.selectedImg = image
    this.listService.setPickMedia(this.selectedImg)
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

}
