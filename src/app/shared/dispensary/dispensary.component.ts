import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Patient, Prescription } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
@Component({
  selector: 'app-dispensary',
  templateUrl: './dispensary.component.html',
  styleUrls: ['./dispensary.component.scss']
})
export class DispensaryComponent implements OnInit {
  pageView:PageView = PageView.listView();
  @Input() selectedPatient: Patient;

  drReportList:LookupItem[];
  frequencyList:LookupItem[];
  patientList:LookupItem[];
  productList:LookupItem[];
  
  prescription:Prescription;
  prescriptionList:Prescription[];
  prescriptionForm:FormGroup;
  constructor(
    private readonly patientService:PatientService, 
    private readonly toast:ToastService,
    private readonly fb:FormBuilder,
    private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupprescriptionForm();
    this.initLookups();
    this.fetchPrescription();
  }

  initiatePrecription(){
    this.prescriptionForm.reset();
    this.prescriptionForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const drReport = await firstValueFrom(this.lookupService.drReport());
    const frequency = await firstValueFrom(this.lookupService.frequency());
    const patient = await firstValueFrom(this.lookupService.patient());

    this.drReportList = drReport.data;
    this.frequencyList = frequency.data;
    this.patientList = patient.data;
  }

  async savePrescription(){
    if(this.prescriptionForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let prescriptionData = this.prescriptionForm.value;
    const result = await firstValueFrom(this.patientService.savePrescription(prescriptionData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchPrescription();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchPrescription(){
    console.log('patient: ', this.selectedPatient);
    const result = await firstValueFrom(this.patientService.loadPrescription(this.selectedPatient.id));
    this.prescriptionList = result.data;
  }

  editPrescription(prescription:Prescription){
    this.prescriptionForm.patchValue({});
    this.prescriptionForm.patchValue(prescription);
    this.pageView.resetToCreateView();
  }

  async deletePrescription(prescriptionId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deletePrescription(prescriptionId, this.selectedPatient.id));
    if(result.success){
      this.toast.success(result.message);
      this.fetchPrescription();
    }else{
      this.toast.error(result.message);
    }
  }
  setupprescriptionForm(){
    this.prescriptionForm = this.fb.group({
      id:null,
      patientId:[null, Validators.required],
      drReportId:[null, Validators.required],
      stockReceiptItemId:[null, Validators.required],
      frequencyId:[null],
      dose:[null],
      notes:[null]
    });
  }
  
  get field(){
    return this.prescriptionForm.controls;
  }
}
