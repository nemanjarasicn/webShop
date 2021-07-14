import { Component, OnInit } from '@angular/core';
import { MediaPick } from 'src/app/interfaces/media';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-pick-media',
  templateUrl: './pick-media.component.html',
  styleUrls: ['./pick-media.component.scss']
})
export class PickMediaComponent implements OnInit {

  constructor(private mediaService: MediaService) { }

  images: MediaPick[]

  ngOnInit(): void {
    this.mediaService.getPickAll().then(res =>{
      this.images = res
    })
  }

}
