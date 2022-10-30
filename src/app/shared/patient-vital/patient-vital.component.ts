import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientVital } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';

@Component({
  selector: 'app-patient-vital',
  templateUrl: './patient-vital.component.html',
  styleUrls: ['./patient-vital.component.scss']
})
export class PatientVitalComponent implements OnInit {
  @Input() selectedPatient:Patient;
  @Input() vitalList :PatientVital[];
  @Input() selectedVital: PatientVital;
  
  pageView:PageView = PageView.listView();

  constructor(
    private patientVitalService:PatientService, 
    private toast:ToastService,
    private eventProxyService: EventProxyService) { }

  ngOnInit(): void {
  }

  initiateLabTest(){
    this.pageView.resetToCreateView();
  }
  
  async fetchPatientVital(){
    const result = await firstValueFrom(this.patientVitalService.loadPatientVital(this.selectedPatient.id));
    this.vitalList = result.data;
  }

  editPatientVital(patientVital:PatientVital){
    this.eventProxyService.sendEvent(patientVital);
  }

  async deletePatientVital(patientVitalId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientVitalService.deletePatientVital(patientVitalId,this.selectedPatient.id));
    if(result.success){
      this.toast.success(result.message);
      this.fetchPatientVital();
    }else{
      this.toast.error(result.message);
    }
  }

}
