import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { LabResult } from '../payload/adminstration';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-lab-result',
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss']
})
export class LabResultComponent implements OnInit {
  pageView:PageView = PageView.listView();

  labTestList:LookupItem[];
  labList:LookupItem[];
  labResultList:LabResult[];
  patientList:LookupItem[];

  labResultForm:FormGroup;
  constructor(private readonly adminService:AdminService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupLabResultForm();
    this.initLookups();
    this.fetchLabResult();
  }

  initiateLabResult(){
    this.labResultForm.reset();
    this.labResultForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const labTest = await firstValueFrom(this.lookupService.labTest());
    const lab = await firstValueFrom(this.lookupService.lab());
    const patient = await firstValueFrom(this.lookupService.patient());

    this.labTestList = labTest.data;
    this.labList = lab.data;
    this.patientList = patient.data;
  }

  async saveLabResult(){
    if(this.labResultForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let labResultData = this.labResultForm.value;
    const result = await firstValueFrom(this.adminService.saveLabResult(labResultData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchLabResult();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchLabResult(){
    const result = await firstValueFrom(this.adminService.loadLabResults());
    this.labResultList = result.data;
  }

  editLabResult(labResult:LabResult){
    this.labResultForm.patchValue({});
    this.labResultForm.patchValue(labResult);
    this.pageView.resetToCreateView();
  }

  async deleteLabResult(labResultId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.adminService.deleteLabResult(labResultId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchLabResult();
    }else{
      this.toast.error(result.message);
    }
  }
  setupLabResultForm(){
    this.labResultForm = this.fb.group({
      id:null,
      patientId:[null, Validators.required],
      labTestId:[null, Validators.required],
      testResult:[null]
    });
  }
  
  get field(){
    return this.labResultForm.controls;
  }

}
