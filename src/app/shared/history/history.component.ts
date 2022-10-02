import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/patient/payload/patient';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() selectedPatient: Patient;
  constructor() { }

  ngOnInit(): void {
  }

}
