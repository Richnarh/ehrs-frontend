import { Component, OnInit } from '@angular/core';
import { PageView } from 'src/app/utils/page-view';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  pageView:PageView = PageView.listView();
  constructor() { }

  ngOnInit(): void {
  }

  initVital(){
    this.pageView.resetToCreateView();
  }

}
