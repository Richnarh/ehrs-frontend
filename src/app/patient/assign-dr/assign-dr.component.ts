import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { AssignDr, Patient } from '../payload/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-assign-dr',
  templateUrl: './assign-dr.component.html',
  styleUrls: ['./assign-dr.component.scss']
})
export class AssignDrComponent implements OnInit {
  @Input() selectedPatient:Patient;
  @Input() assignDrList:AssignDr[];

  employeeList:LookupItem[];

  assignDrForm:FormGroup;

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;

  constructor(private eventProxyService: EventProxyService, private patientService:PatientService, private toast:ToastService,private fb:FormBuilder,private lookupService:LookupService,) { }

  async ngOnInit(): Promise<void> {
    this.setupAssignDrForm();
    this.initLookups();

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.CLINICAL));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Assign Dr'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Delete Assign Dr'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
  }

  async initLookups(){
    const empData = await firstValueFrom(this.lookupService.employee());
    this.employeeList = empData.data;
  }

  async saveAssignDr(){
    let assignDrData = this.assignDrForm.value;
    assignDrData.patientId = this.selectedPatient.id;
    if(this.assignDrForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    const result = await firstValueFrom(this.patientService.saveAssignDr(assignDrData,this.selectedPatient.id));
    if(result){
      this.toast.success(result.message);
      this.fetchAssignDr();

      this.assignDrForm.reset();
      this.assignDrForm.patchValue({});
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchAssignDr(){
    const result = await firstValueFrom(this.patientService.loadAssignDr(this.selectedPatient.id));
    this.assignDrList = result.data;
  }

  editAssignDr(assignDr:AssignDr){
    this.assignDrForm.patchValue({});
    this.assignDrForm.patchValue(assignDr);
  }

  async deleteAssignDr(assignDrId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteAssignDr(assignDrId,this.selectedPatient.id));
    if(result.success){
      this.toast.success(result.message);
      this.fetchAssignDr();
    }else{
      this.toast.error(result.message);
    }
  }

  setupAssignDrForm(){
    this.assignDrForm = this.fb.group({
      id:null,
      doctorId:[null],
      patientId:[null],
      note:null,
    });
  }
}
