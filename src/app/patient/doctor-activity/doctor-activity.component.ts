import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { CompainsComponent } from '../compains/compains.component';
import { Patient, PatientAddmission, Prescription } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-doctor-activity',
  templateUrl: './doctor-activity.component.html',
  styleUrls: ['./doctor-activity.component.scss']
})
export class DoctorActivityComponent implements OnInit {
  @ViewChild(CompainsComponent, { static: false })
  private compainsComponent:CompainsComponent;
  
  selectedPatient:Patient;
  patientSearchList:Patient[]=[];
  opdSearchField:any;
  isLoaded:boolean = false;

  prescriptionList:Prescription[];
  patientAdmissionList:PatientAddmission[];

  pageView:PageView = PageView.listView();

  constructor(private readonly patientService:PatientService,private eventProxyService: EventProxyService) { }

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
    this.eventProxyService.sendEvent(patientData);
  }

  loadComplains(){
    this.compainsComponent.loadPatientComplains(this.selectedPatient);
  }
}
