import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { Patient } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-doctor-activity',
  templateUrl: './doctor-activity.component.html',
  styleUrls: ['./doctor-activity.component.scss']
})
export class DoctorActivityComponent implements OnInit {
  selectedPatient:Patient;
  patientSearchList:Patient[]=[];
  opdSearchField:any="00024423DA";
  isLoaded:boolean = false;

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
  }

  loadPatientData(patientData:Patient){
    this.selectedPatient = patientData;
  }

  assignPatient(patientData:Patient){
    
  }
}
