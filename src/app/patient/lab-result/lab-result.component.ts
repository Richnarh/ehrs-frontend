import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { LabResult } from '../../administration/payload/adminstration';
import { AdminService } from '../../administration/services/admin.service';
import { LabTest } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-lab-result',
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss']
})
export class LabResultComponent implements OnInit {
  pageView:PageView = PageView.listView();

  // labTestList:LookupItem[];
  labList:LookupItem[];
  labResultList:LabResult[];
  patientList:LookupItem[];

  labTestList: LabTest[];

  searchDate:string = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  textSearchField:any=null

  labResultForm:FormGroup;
  constructor(private readonly patientService:PatientService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupLabResultForm();
    this.initLookups();
    this.fetchLabResult();
  }

  async searchData(){
    console.log(this.searchDate, this.textSearchField);
    const result = await firstValueFrom(this.patientService.searchData(this.searchDate, this.textSearchField));
    console.log(result);
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
    const result = await firstValueFrom(this.patientService.saveLabResult(labResultData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchLabResult();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchLabResult(){
    const result = await firstValueFrom(this.patientService.loadLabResults());
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
    const result = await firstValueFrom(this.patientService.deleteLabResult(labResultId));
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
