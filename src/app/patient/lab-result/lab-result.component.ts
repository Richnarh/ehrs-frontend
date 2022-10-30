import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { LabResult } from '../../administration/payload/adminstration';
import { LabTest } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-lab-result',
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss']
})
export class LabResultComponent implements OnInit {
  pageView:PageView = PageView.listView();

  labList:LookupItem[];
  labResult:LabResult;
  patientList:LookupItem[];
  patientName:string;
  patientId:string;
  labTestId:string;

  labTestList: LabTest[]=[];

  searchDate:any = null;
  // searchDate:string = new Date().toJSON().slice(0,10).replace(/-/g,'-');
  textSearchField:any="00024423DA"

  labResultForm:FormGroup;
  constructor(private readonly patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupLabResultForm();
    this.initLookups();
  }

  async searchData(){
    if(this.searchDate === ''){this.searchDate = null;}
    const result = await firstValueFrom(this.patientService.searchData(this.searchDate, this.textSearchField));
    this.labTestList = result.data;
    this.patientName= result.data[0].patientName;
    this.patientId = result.data[0].patientId;
  }

  async prepareLabResult(labTest:LabTest){
    this.resetForm();
    this.labTestId = labTest.id;
    const result = await firstValueFrom(this.patientService.loadLabResults(labTest.id,this.patientId));
    this.labResult = result.data;
    this.labResultForm.patchValue(result.data);
  }

  initiateLabResult(){
    this.labResultForm.reset();
    this.labResultForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const lab = await firstValueFrom(this.lookupService.lab());
    const patient = await firstValueFrom(this.lookupService.patient());

    this.labList = lab.data;
    this.patientList = patient.data;
  }

  async saveLabResult(){
    if(this.labResultForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let labResultData = this.labResultForm.value;
    labResultData.labTestId = this.labTestId
    labResultData.patientId = this.patientId
    const result = await firstValueFrom(this.patientService.saveLabResult(labResultData,this.patientId));
    if(result){
      this.toast.success(result.message);
    }else{
      this.toast.error(result.message);
    }
  }

  editLabResult(labResult:LabResult){
    this.labResultForm.patchValue({});
    this.labResultForm.patchValue(labResult);
    this.pageView.resetToCreateView();
  }

  async deleteLabResult(labResultId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteLabResult(labResultId,this.patientId));
    if(result.success){
      this.toast.success(result.message);
      this.labResultForm.reset();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.labResultForm.reset();
    this.labResultForm.patchValue({});
  }
  setupLabResultForm(){
    this.labResultForm = this.fb.group({
      id:null,
      patientId:[null],
      labTestId:[null],
      testResult:[null],
      price:[0.0]
    });
  }
  
  get field(){
    return this.labResultForm.controls;
  }

}
