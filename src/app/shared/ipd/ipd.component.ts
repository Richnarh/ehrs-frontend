import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientAddmission } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
@Component({
  selector: 'app-ipd',
  templateUrl: './ipd.component.html',
  styleUrls: ['./ipd.component.scss']
})
export class IpdComponent implements OnInit {
  pageView:PageView = PageView.listView();
  patientAdmissionList:PatientAddmission[];
  @Input() selectedPatient:Patient;
  roomList:LookupItem[];
  labList:LookupItem[];
  patientList:LookupItem[];

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;

  patientAddmissionForm:FormGroup;
  constructor(private patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService, private eventProxyService: EventProxyService) { }

  async ngOnInit(): Promise<void> {
    this.setupAdmissionForm();
    this.initLookups();

    this.eventProxyService.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.setData(param);
      }
    });

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.DR_ACTIVITY));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit IPD'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add IPD'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete IPD'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
  }

  async setData(patientData:Patient){
    this.patientAdmissionList = [];
    this.selectedPatient = patientData;
    const result = await firstValueFrom(this.patientService.loadPatientAdmissions(patientData.id));
    this.patientAdmissionList = result.data;
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
