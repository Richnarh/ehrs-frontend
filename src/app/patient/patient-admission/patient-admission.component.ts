import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { Patient, PatientAddmission } from '../payload/patient';
import { PatientService } from '../services/patient.service';
@Component({
  selector: 'app-patient-admission',
  templateUrl: './patient-admission.component.html',
  styleUrls: ['./patient-admission.component.scss']
})
export class PatientAdmissionComponent implements OnInit {
  pageView:PageView = PageView.listView();
  @Input() patientAdmissionList:PatientAddmission[];
  @Input() selectedPatient:Patient;
  roomList:LookupItem[];
  labList:LookupItem[];
  patientList:LookupItem[];

  patientAddmissionForm:FormGroup;
  constructor(private readonly patientService:PatientService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupAdmissionForm();
    this.initLookups();
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
    let admissionData = this.patientAddmissionForm.value;
    admissionData.patientId = this.selectedPatient.id;
    if(this.patientAddmissionForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    const result = await firstValueFrom(this.patientService.savePatientAdmission(admissionData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchPatientAdmission();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchPatientAdmission(){
    const result = await firstValueFrom(this.patientService.loadPatientAdmissions(this.selectedPatient.id));
    this.patientAdmissionList = result.data;
  }

  editPatientAdmission(admissionData:PatientAddmission){
    this.patientAddmissionForm.patchValue({});
    this.patientAddmissionForm.patchValue(admissionData);
    this.pageView.resetToCreateView();
  }

  async deletePatientAdmission(admissionId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deletePatientAdmission(admissionId,this.selectedPatient.id));
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
      patientId:[null],
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
