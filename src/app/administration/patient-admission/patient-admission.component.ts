import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { PatientAddmission } from '../payload/adminstration';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-patient-admission',
  templateUrl: './patient-admission.component.html',
  styleUrls: ['./patient-admission.component.scss']
})
export class PatientAdmissionComponent implements OnInit {
  pageView:PageView = PageView.listView();

  roomList:LookupItem[];
  labList:LookupItem[];
  patientAdmissionList:PatientAddmission[];
  patientList:LookupItem[];

  patientAddmissionForm:FormGroup;
  constructor(private readonly adminService:AdminService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupAdmissionForm();
    this.initLookups();
    this.fetchPatientAdmission();
  }

  initPatientAdmission(){
    this.patientAddmissionForm.reset();
    this.patientAddmissionForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const room = await firstValueFrom(this.lookupService.room());
    const lab = await firstValueFrom(this.lookupService.lab());
    const patient = await firstValueFrom(this.lookupService.patient());

    this.roomList = room.data;
    this.labList = lab.data;
    this.patientList = patient.data;
  }

  async savePatientAdmission(){
    if(this.patientAddmissionForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let admissionData = this.patientAddmissionForm.value;
    const result = await firstValueFrom(this.adminService.savePatientAdmission(admissionData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchPatientAdmission();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchPatientAdmission(){
    const result = await firstValueFrom(this.adminService.loadPatientAdmissions());
    this.patientAdmissionList = result.data;
  }

  editPatientAdmission(admissionData:PatientAddmission){
    this.patientAddmissionForm.patchValue({});
    this.patientAddmissionForm.patchValue(admissionData);
    this.pageView.resetToCreateView();
  }

  async deletePatientAdmission(patientId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.adminService.deletePatientAdmission(patientId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchPatientAdmission();
    }else{
      this.toast.error(result.message);
    }
  }
  setupAdmissionForm(){
    this.patientAddmissionForm = this.fb.group({
      id:null,
      patientId:[null, Validators.required],
      labId:[null, Validators.required],
      admissionDate:[new Date()],
      noOfDays:[0, Validators.required],
      roomId:[null, Validators.required]
    });
  }
  
  get field(){
    return this.patientAddmissionForm.controls;
  }
}
