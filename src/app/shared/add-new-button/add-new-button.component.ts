import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'add-new-button',
  templateUrl: './add-new-button.component.html',
  styleUrls: ['./add-new-button.component.scss']
})
export class AddNewButtonComponent implements OnInit {

  @Input("label") label:string;

  constructor() { }

  ngOnInit(): void {
  }

}
