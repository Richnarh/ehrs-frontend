import { Component, Input, OnInit } from '@angular/core';
import { Patient, PatientAddmission, Prescription } from '../payload/patient';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
 @Input() selectedPatient:Patient;
  
  constructor() { }

  ngOnInit(): void {
  }

}
