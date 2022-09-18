import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
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

  constructor(private readonly patientService:PatientService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupAssignDrForm();
    this.initLookups();
  }

  async initLookups(){
    const empData = await firstValueFrom(this.lookupService.employee());

    this.employeeList = empData.data;
  }

  async saveAssignDr(){
    if(this.assignDrForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let assignDrData = this.assignDrForm.value;
    console.log('assignDrData: '+assignDrData);
    assignDrData.patientId = this.selectedPatient.id;
    const result = await firstValueFrom(this.patientService.saveAssignDr(assignDrData));
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
    const result = await firstValueFrom(this.patientService.loadAssignDr());
    this.assignDrList = result.data;
  }

  editAssignDr(assignDr:AssignDr){
    this.assignDrForm.patchValue({});
    this.assignDrForm.patchValue(assignDr);
  }

  async deleteAssignDr(assignDrId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteAssignDr(assignDrId));
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
      doctorId:[null, Validators.required],
      patientId:[null, Validators.required],
      note:null,
    });
  }
}
