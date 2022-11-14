import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { VitalFormComponent } from 'src/app/shared/vital-form/vital-form.component';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { AssignDr, Patient, PatientAddmission, PatientVital } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  pageView:PageView = PageView.listView();

  @ViewChild(VitalFormComponent, { static: false })
  private vitalComponent:VitalFormComponent;

  pages:any;
  adp:string;adb:boolean;
  drp:string;drb:boolean;
  vp:string;vpb:boolean;
  ep:string;epb:boolean;
  adm:string;admb:boolean;
  delp:string;delpb:boolean;

  selectedPatient:Patient;
  vitalList:PatientVital[];
  patientList:Patient[];
  assignDrList:AssignDr[];
  patientAdmissionList:PatientAddmission[];

  genderList:LookupItem[];
  patientCategoryList:LookupItem[];
  idTypeList:LookupItem[];

  patientForm:FormGroup;
  vitalForm:FormGroup;
  
  constructor(private proxy:EventProxyService, private patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService,) { }

  async ngOnInit(): Promise<void> {
    this.setupPatientForm();
    this.initLookups();
    this.fetchPatient();

    const result = await firstValueFrom(this.proxy.loadPages('Clinical'));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      console.log("pn: ",i.pageName, 'pv: ',i.userActivePage)
      if(i.pageName === 'Add Patient'){
        this.adp = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Assign Dr'){
        this.drp = i.pageName;
        this.drb = i.userActivePage;
      }
      if(i.pageName === 'Vitals'){
        this.vp = i.pageName;
        this.vpb = i.userActivePage;
      }
      if(i.pageName === 'Edit Patient'){
        this.ep = i.pageName;
        this.epb = i.userActivePage;
      }
      if(i.pageName === 'Admission'){
        this.adm = i.pageName;
        this.admb = i.userActivePage;
      }
      if(i.pageName === 'Delete Patient'){
        this.delp = i.pageName;
        this.delpb = i.userActivePage;
      }
        
    }
  }

  initPatient(){
    this.patientForm.reset();
    this.patientForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  
  resetVitalForm(){
    this.vitalComponent.resetForm();
  }

  async initLookups(){
    const gender = await firstValueFrom(this.lookupService.gender());
    const pc = await firstValueFrom(this.lookupService.patientCategory());
    const idType = await firstValueFrom(this.lookupService.idType());

    this.genderList = gender.data;
    this.patientCategoryList = pc.data;
    this.idTypeList = idType.data;
  }

  async savePatient(){
    if(this.patientForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let patientData = this.patientForm.value;
    const result = await firstValueFrom(this.patientService.savePatient(patientData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchPatient();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchPatient(){
    const result = await firstValueFrom(this.patientService.loadPatients());
    this.patientList = result.data;
  }

  editPatient(patientData:Patient){
    this.patientForm.patchValue({});
    this.patientForm.patchValue(patientData);
    this.pageView.resetToCreateView();
  }

  async deletePatient(patientId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deletePatient(patientId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchPatient();
    }else{
      this.toast.error(result.message);
    }
  }

  async assignDr(patientData:Patient){
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadAssignDr(patientData.id));
    this.assignDrList = result.data;

    const admission = await firstValueFrom(this.patientService.loadPatientAdmissions(patientData.id));
    this.patientAdmissionList = admission.data;
  }

  async takeVitals(patientData:Patient){
    this.pageView.resetToDetailView();
    this.vitalList = [];
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadPatientVital(patientData.id));
    this.vitalList = result.data;
  }

  async admission(patientData:Patient){
    this.patientAdmissionList = [];
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadPatientAdmissions(patientData.id));
    this.patientAdmissionList = result.data;
  }

  setupPatientForm(){
    this.patientForm = this.fb.group({
      id:null,
      fullname:[null, Validators.required],
      opdNumber:[null, Validators.required],
      gender:[null, Validators.required],
      patientCategory:[null],
      age:[0, Validators.required],
      phoneNumber:[null, Validators.required],
      address:[null],
      idType:[null, Validators.required],
      idNumber: [null, Validators.required],
      occupation: [null, Validators.required],
    });
  }
  
  get field(){
    return this.patientForm.controls;
  }
}
