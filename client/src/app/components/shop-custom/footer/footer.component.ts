import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  curYear: number = new Date().getFullYear()
  copyRightOwner: string = 'Besplatna dostava Kruševac'
  poweredByName: string = 'Illusion'
  developedByName: string = 'Silvertek Studio'
  constructor() { }

  ngOnInit(): void {
  }

}
