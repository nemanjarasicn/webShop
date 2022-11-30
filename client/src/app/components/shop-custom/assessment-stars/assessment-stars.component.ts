import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assessment-stars',
  templateUrl: './assessment-stars.component.html',
  styleUrls: ['./assessment-stars.component.scss']
})
export class AssessmentStarsComponent implements OnInit {
  @Input() assessmentSum: number;
  constructor() { }

  ngOnInit(): void {
  }

}
