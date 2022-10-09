import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { Complain, DrReport, Patient } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-compains',
  templateUrl: './compains.component.html',
  styleUrls: ['./compains.component.scss']
})
export class CompainsComponent implements OnInit {
  @Input() selectedPatient:Patient;
  @Input() selectedComplain:Complain;
  @Input() drReportList:DrReport[];
  
  pageView:PageView = PageView.listView();

  complainList:Complain[];

  constructor(private patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService,) { }

  complainForm:FormGroup;

  ngOnInit(): void {
    this.setupForm();
  }

  initComplains(){
    this.resetForm();
    this.pageView.resetToCreateView();
  }

  async saveComplains(){
    let complainData = this.complainForm.value;
    complainData.patientId = this.selectedPatient.id;
    if(this.complainForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    const result = await firstValueFrom(this.patientService.saveComplains(complainData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.loadPatientComplains(this.selectedPatient);

      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }
  
  editComplain(complain:Complain){
    this.complainForm.patchValue({});
    this.complainForm.patchValue(complain);
  }

  async deleteComplain(complainId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteComplains(complainId,this.selectedPatient.id));
    if(result.success){
      this.toast.success(result.message);
      this.loadPatientComplains(this.selectedPatient);
    }else{
      this.toast.error(result.message);
    }
  }

  async loadPatientComplains(selectedPatient:Patient){
    const result = await firstValueFrom(this.patientService.loadComplains(selectedPatient.id));
    this.complainList = result.data;
  }

  async addNotes(complain:Complain){
    this.pageView.resetToDetailView();
    this.selectedComplain = complain; 
    const result = await firstValueFrom(this.patientService.loadDrReport(this.selectedPatient.id, complain.id));
    this.drReportList = result.data;
  }

  resetForm(){
    this.complainForm.reset();
    this.complainForm.patchValue({});
  }

  setupForm(){
    this.complainForm = this.fb.group({
      id:null,
      patientId:[null],
      complains:[null, Validators.required]
    });
  }
  get field(){
    return this.complainForm.controls;
  }
}
