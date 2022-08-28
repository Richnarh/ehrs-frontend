import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
  @Input("label") label:string;
  constructor() { }

  ngOnInit(): void {
  }

}
