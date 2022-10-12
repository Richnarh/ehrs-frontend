import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Patient, LabTest } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  pageView:PageView = PageView.listView();
  @Input() selectedPatient:Patient;
  @Input() labTestList: LabTest[];
  labTest:LabTest;

  testTypeList:LookupItem[];
  labList:LookupItem[];

  labTestForm: FormGroup;
  constructor(private fb:FormBuilder, private patientService:PatientService, private toast:ToastService, private lookupService:LookupService,private eventProxyService: EventProxyService) { }

  ngOnInit(): void {
    this.formSetup();
    this.initLookups();
    this.eventProxyService.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.setData(param);
      }
    });
  }
  initiateLabTest(){
    this.labTestForm.reset();
    this.labTestForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async setData(patientData:Patient){
    this.labTestList = [];
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadLabTest(patientData.id));
    this.labTestList = result.data;
  }
  
  async initLookups(){
    const testType = await firstValueFrom(this.lookupService.testType());
    this.testTypeList = testType.data;
    const lab = await firstValueFrom(this.lookupService.lab());
    this.labList = lab.data;
  }
  async saveLabTest(){
    let labTestData = this.labTestForm.value;
    labTestData.patientId = this.selectedPatient.id;
    if(this.labTestForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    const result = await firstValueFrom(this.patientService.saveLabTest(labTestData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.fetchLabTest();
      this.resetForm();
      this.pageView.resetToListView();
    }else{
      this.toast.error(result.message);
    }
  }
  async fetchLabTest(){
    const result = await firstValueFrom(this.patientService.loadLabTest(this.selectedPatient.id));
    this.labTestList = result.data;
  }
  editLabTest(labTest:LabTest){
    this.labTestForm.patchValue({});
    this.labTestForm.patchValue(labTest);
    this.pageView.resetToCreateView();
  }
  async deleteLabTest(LabTestId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteLabTest(LabTestId,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.fetchLabTest();
    }
  }

  resetForm(){
    this.labTestForm.reset();
    this.labTestForm.patchValue({});
  }
 formSetup () {
  this.labTestForm = this.fb.group({
    id:null,
    patientId:[null],
    labId:[null, Validators.required],
    testDate:[new Date()],
    doctorId:[null],
    testTypeId:[null, Validators.required]
  });
}
get field(){
  return this.labTestForm.controls;
}
}
