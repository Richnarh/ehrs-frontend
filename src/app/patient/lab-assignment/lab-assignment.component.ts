import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../payload/patient';

@Component({
  selector: 'app-lab-assignment',
  templateUrl: './lab-assignment.component.html',
  styleUrls: ['./lab-assignment.component.scss']
})
export class LabAssignmentComponent implements OnInit {
  @Input() selectedPatient:Patient;
  constructor() { }

  ngOnInit(): void {
  }

}
