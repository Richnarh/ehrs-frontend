import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { StorageService } from 'src/app/services/storage.service';
import { LocalKeys } from 'src/app/utils/LocalKeys';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { DrReport, Patient } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-dr-report',
  templateUrl: './dr-report.component.html',
  styleUrls: ['./dr-report.component.scss']
})
export class DrReportComponent implements OnInit {
  @Input() selectedPatient:Patient;
  @Input() drReportList:DrReport[];

  assignPatientList:LookupItem[];

  drReportForm:FormGroup;

  constructor(private storage:StorageService, private patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupDrReportForm();
    this.initLookups();
  }

  async initLookups(){
    const assignPatientData = await firstValueFrom(this.lookupService.assignPatient());

    this.assignPatientList = assignPatientData.data;
  }

  async saveDrReport(){
    let drReportData = this.drReportForm.value;
    drReportData.patientId = this.selectedPatient.id;
    if(this.drReportForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    const result = await firstValueFrom(this.patientService.saveDrReport(drReportData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.loadDrReport(this.selectedPatient);

      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }
  
  editDrReport(drReport:DrReport){
    this.drReportForm.patchValue({});
    this.drReportForm.patchValue(drReport);
  }

  async deleteDrReport(drReportId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteDrReport(drReportId,this.selectedPatient.id));
    if(result.success){
      this.toast.success(result.message);
      this.loadDrReport(this.selectedPatient);
    }else{
      this.toast.error(result.message);
    }
  }

  async loadDrReport(selectedPatient:Patient){
    const result = await firstValueFrom(this.patientService.loadDrReport(selectedPatient.id));
    this.drReportList = result.data;
  }

  resetForm(){
    this.drReportForm.reset();
    this.drReportForm.patchValue({});
  }

  setupDrReportForm(){
    this.drReportForm = this.fb.group({
      id:null,
      patientId:[null],
      comment:null,
      assignPatient:null,
    });
  }
}
