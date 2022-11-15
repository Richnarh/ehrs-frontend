import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientVital } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { AppModules } from 'src/app/services/modules';
import { PageView } from 'src/app/utils/page-view';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  vitalList:PatientVital[];
  selectedPatient: Patient;

  pages:any;
  vp:string;vpb:boolean;

  pageView:PageView = PageView.listView();
  constructor(private readonly patientService:PatientService, private readonly eventProxyService: EventProxyService) { }

  async ngOnInit(): Promise<void> {
    this.eventProxyService.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.setData(param);
      }
    });

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.CLINICAL));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Add Vital'){
        this.vp = i.pageName;
        this.vpb = i.userActivePage;
      }
        
    }
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
