import { Component, Input, OnInit } from '@angular/core';
import { Patient } from "../../patient/payload/patient";

@Component({
  selector: 'app-lab-result-info',
  templateUrl: './lab-result-info.component.html',
  styleUrls: ['./lab-result-info.component.scss']
})
export class LabResultInfoComponent implements OnInit {
  @Input() selectedPatient:Patient;
  @Input() testResult:any;

  labResult:any;
  constructor() { }

  ngOnInit(): void {
    this.labResult = this.testResult;
  }

  labResultData (result:any) {
    if(result === undefined || result === '' || result === null)
      this.labResult = "No Test Result Available";
    else
      this.labResult = result;
  }

}
