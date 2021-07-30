import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-show-full-media',
  templateUrl: './show-full-media.component.html',
  styleUrls: ['./show-full-media.component.scss']
})
export class ShowFullMediaComponent implements OnInit, OnDestroy {

  showMediaArr!: string[] | {src_name: string}[]
  activeImage!: string
  subscribe: Subscription

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.subscribe = this.mediaService.showFullMediaActiveArr().subscribe((res: string[] | {src_name: string}[])=>{
      if(res){
        this.showMediaArr = res
        //@ts-ignore
        this.activeImage = res[0]?.src_name || res[0]
      }
    })  
  }

  setActiveImage(src: string): void{
    this.activeImage = src
  }

  ngOnDestroy(): void{
    this.subscribe.unsubscribe()
  }
}
