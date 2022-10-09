import { Component, Input, OnInit } from '@angular/core';
import { Patient, Prescription } from '../payload/patient';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
 @Input() selectedPatient:Patient;
 @Input() prescriptionList:Prescription[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
