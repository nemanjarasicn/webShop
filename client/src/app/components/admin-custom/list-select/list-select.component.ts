import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss']
})


export class ListSelectComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() key: string;
  @Input() required: boolean;
  @Input() options!: {label: string, value: string}[];

  constructor() { }

  ngOnInit(): void {}
}
