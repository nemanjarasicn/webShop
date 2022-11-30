import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  curYear: number = new Date().getFullYear();
  copyRightOwner = 'Besplatna dostava Kruševac';
  poweredByName = 'Illusion';
  developedByName = 'Tech Booster';
  constructor() { }

  ngOnInit(): void {
  }

}
