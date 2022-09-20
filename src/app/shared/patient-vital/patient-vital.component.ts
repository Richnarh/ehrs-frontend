import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Patient } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { PatientVital } from 'src/app/payload/config';
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

  pageView:PageView = PageView.listView();
  patientVitalList:PatientVital[];

  patientVitalForm:FormGroup;
  constructor(private readonly patientVitalService:PatientService, private readonly toast:ToastService,private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    // this.setupPatientVitalForm();
    // this.fetchPatientVital();

    console.log("vitals: "+this.selectedPatient)
    console.log("vitalList: "+this.vitalList)
  }

  initiateLabTest(){
    this.patientVitalForm.reset();
    
    this.pageView.resetToCreateView();
  }
  
  async fetchPatientVital(){
    const result = await firstValueFrom(this.patientVitalService.loadPatientVital());
    this.patientVitalList = result.data;
  }

  editPatientVital(patientVital:PatientVital){
    this.patientVitalForm.patchValue({});
    this.patientVitalForm.patchValue(patientVital);
    this.pageView.resetToCreateView();
  }

  async deletePatientVital(patientVitalId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientVitalService.deletePatientVital(patientVitalId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchPatientVital();
    }else{
      this.toast.error(result.message);
    }
  }

}
