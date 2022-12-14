import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
import { SweetMessage } from 'src/app/utils/sweet-message';
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
  @Input() prescriptionList: Prescription[];
  prescription:Prescription;

  drReportList:LookupItem[];
  inventoryList:LookupItem[];
  frequencyList:LookupItem[];

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;

  prescriptionForm: FormGroup;
  constructor(private fb:FormBuilder, private patientService:PatientService, private toast:ToastService, private lookupService:LookupService,private eventProxyService: EventProxyService) { }

  async ngOnInit(): Promise<void> {
    this.formSetup();
    this.initLookups();
    this.eventProxyService.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.setData(param);
      }
    });

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.DR_ACTIVITY));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Prescription'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add Prescription'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete Prescription'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
  }
  async setData(patientData:Patient){
    this.prescriptionList = [];
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadPrescription(patientData.id));
    this.prescriptionList = result.data;
  }
  
  async initLookups(){
    const report = await firstValueFrom(this.lookupService.drReport());
    this.drReportList = report.data;

    const stock = await firstValueFrom(this.lookupService.stock());
    this.inventoryList = stock.data;
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
      this.resetForm();
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
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
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
    inventoryId:[null, Validators.required],
    frequencyId:[0, Validators.required],
    dose:[null],
    notes:[null],
  });
}
get field(){
  return this.prescriptionForm.controls;
}
}