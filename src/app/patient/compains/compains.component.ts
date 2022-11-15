import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
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
  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;

  constructor(private eventProxyService: EventProxyService, private patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService,) { }

  complainForm:FormGroup;

  async ngOnInit(): Promise<void> {
    this.setupForm();
    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.CLINICAL));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Complanin'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add Complanin'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete Complain'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
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
