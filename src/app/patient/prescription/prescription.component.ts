import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { ToastService } from 'src/app/utils/toast-service';
import { Patient, Prescription } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  @Input() selectedPatient:Patient;
  prescriptionList: Prescription[];
  prescription:Prescription;

  drReportList:LookupItem[];
  stockReceiptItemList:LookupItem[];
  frequencyList:LookupItem[];

  prescriptionForm: FormGroup;
  constructor(private fb:FormBuilder, private patientService:PatientService, private toast:ToastService, private lookupService:LookupService) { }

  ngOnInit(): void {
    this.formSetup();

    this.initLookups();
  }

  async initLookups(){
    const report = await firstValueFrom(this.lookupService.drReport());
    this.drReportList = report.data;

    const stock = await firstValueFrom(this.lookupService.stock());
    this.stockReceiptItemList = stock.data;
    const freq = await firstValueFrom(this.lookupService.frequency());
    this.frequencyList = freq.data;
  }
  async savePrescription(){
    let prescriptionData = this.prescriptionForm.value;
    prescriptionData.patientId = this.selectedPatient.id;
    if(this.prescriptionForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    const result = await firstValueFrom(this.patientService.savePrescription(prescriptionData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.fetchPrescription();
    }else{
      this.toast.error(result.message);
    }
  }
  async fetchPrescription(){
    const result = await firstValueFrom(this.patientService.loadPrescription(this.selectedPatient.id));
    this.prescriptionList = result.data;
  }
  editPrescription(prescription:Prescription){
    this.prescriptionForm.patchValue({});
    this.prescriptionForm.patchValue(prescription);
  }
  async deletePrescription(prescriptionId:string){
    const result = await firstValueFrom(this.patientService.deletePrescription(prescriptionId,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.fetchPrescription();
    }
  }

  resetForm(){
    this.prescriptionForm.reset();
    this.prescriptionForm.patchValue({});
  }
 formSetup () {
  this.prescriptionForm = this.fb.group({
    id:null,
    patientId:[null],
    drReportId:[null],
    stockReceiptItemId:[null, Validators.required],
    frequencyId:[0, Validators.required],
    dose:[null],
    notes:[null]
  });
}
get field(){
  return this.prescriptionForm.controls;
}
}