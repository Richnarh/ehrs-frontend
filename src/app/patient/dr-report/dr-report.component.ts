import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
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

  constructor(private readonly patientService:PatientService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

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
      this.fetchDrReport();

      this.drReportForm.reset();
      this.drReportForm.patchValue({});
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchDrReport(){
    const result = await firstValueFrom(this.patientService.loadDrReport(this.selectedPatient.id));
    this.drReportList = result.data;
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
      this.fetchDrReport();
    }else{
      this.toast.error(result.message);
    }
  }

  setupDrReportForm(){
    this.drReportForm = this.fb.group({
      id:null,
      doctorId:[null],
      patientId:[null],
      note:null,
    });
  }
}
