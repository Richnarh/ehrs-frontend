import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientVital } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { PageView } from 'src/app/utils/page-view';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  vitalList:PatientVital[];
  selectedPatient: Patient;

  pageView:PageView = PageView.listView();
  constructor(private readonly patientService:PatientService, private readonly eventProxyService: EventProxyService) { }

  ngOnInit(): void {
    this.eventProxyService.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.setData(param);
      }
    });
  }

  initVital(){
    this.pageView.resetToCreateView();
  }

  async setData(patientData:Patient){
    this.vitalList = [];
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadPatientVital(patientData.id));
    this.vitalList = result.data;
  }
}
