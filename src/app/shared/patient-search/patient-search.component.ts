import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Patient } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { SweetMessage } from 'src/app/utils/sweet-message';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {

  patientSearchList:Patient[]=[];
  opdSearchField:any="00024423DA";
  isLoaded:boolean = false;
  constructor(private readonly patientService:PatientService) { }

  ngOnInit(): void {
  }

 async searchPatient(){
    this.patientSearchList = [];
    if(this.opdSearchField == null || this.opdSearchField == ''){
      SweetMessage.error("Please enter OPD Number!");
      return;
    }
    const result = await firstValueFrom(this.patientService.findPatient(this.opdSearchField));
    console.log(result.data);
    this.patientSearchList.push(result.data);
  }

  loadPatientData(searchData:Patient){
    this.isLoaded = true;
  }
}
