import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LabTest } from 'src/app/patient/payload/patient';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss']
})
export class LabTestComponent implements OnInit {
  pageView:PageView = PageView.listView();

  doctorList:LookupItem[];
  labList:LookupItem[];
  labTestList:LabTest[];
  patientList:LookupItem[];

  labTestForm:FormGroup;
  constructor(private readonly adminService:AdminService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupLabTestForm();
    this.initLookups();
    this.fetchLabTest();
  }

  initiateLabTest(){
    this.labTestForm.reset();
    this.labTestForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const doctor = await firstValueFrom(this.lookupService.employee());
    const lab = await firstValueFrom(this.lookupService.lab());
    const patient = await firstValueFrom(this.lookupService.patient());

    this.doctorList = doctor.data;
    this.labList = lab.data;
    this.patientList = patient.data;
  }

  async saveLabTest(){
    if(this.labTestForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let labTestData = this.labTestForm.value;
    const result = await firstValueFrom(this.adminService.saveLabTest(labTestData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchLabTest();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchLabTest(){
    const result = await firstValueFrom(this.adminService.loadLabTests());
    this.labTestList = result.data;
  }

  editLabTest(labTest:LabTest){
    this.labTestForm.patchValue({});
    this.labTestForm.patchValue(labTest);
    this.pageView.resetToCreateView();
  }

  async deleteLabTest(labTestId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.adminService.deleteLabTest(labTestId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchLabTest();
    }else{
      this.toast.error(result.message);
    }
  }
  setupLabTestForm(){
    this.labTestForm = this.fb.group({
      id:null,
      patientId:[null, Validators.required],
      labId:[null, Validators.required],
      testDate:[new Date()],
      doctorId:[null, Validators.required]
    });
  }
  
  get field(){
    return this.labTestForm.controls;
  }
}
