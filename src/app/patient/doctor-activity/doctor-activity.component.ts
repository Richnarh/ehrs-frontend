import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { DrReportComponent } from '../dr-report/dr-report.component';
import { Patient, Prescription } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-doctor-activity',
  templateUrl: './doctor-activity.component.html',
  styleUrls: ['./doctor-activity.component.scss']
})
export class DoctorActivityComponent implements OnInit {
  @ViewChild(DrReportComponent, { static: false })
  private drComponent:DrReportComponent;
  
  selectedPatient:Patient;
  patientSearchList:Patient[]=[];
  opdSearchField:any="00024423DA";
  isLoaded:boolean = false;

  prescriptionList:Prescription[];

  pageView:PageView = PageView.listView();

  constructor(private readonly patientService:PatientService,) { }

  ngOnInit(): void {
  }
  
  async searchPatient(){
    this.patientSearchList = [];
    if(this.opdSearchField == null || this.opdSearchField == ''){
      SweetMessage.error("Please enter OPD Number!");
      return;
    }
    const result = await firstValueFrom(this.patientService.findPatient(this.opdSearchField));
    this.patientSearchList.push(result.data);
    this.selectedPatient= result.data;
  }

   async assignPatient(patientData:Patient){
    this.pageView.resetToCreateView();
    this.selectedPatient = patientData;

    const result = await firstValueFrom(this.patientService.loadPrescription(patientData.id));
    this.prescriptionList = result.data;
  }

  loadDrReport(){
    this.drComponent.loadDrReport(this.selectedPatient);
  }
}
