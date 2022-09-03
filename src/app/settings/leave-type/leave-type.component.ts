import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LeaveType } from 'src/app/payload/config';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent implements OnInit {

  leaveTypeForm:FormGroup;
  leaveTypeList:LeaveType[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly toast:ToastService) { }

  ngOnInit(): void {
    this.setupLeaveTypeForm();

    this.fetchLeaveType();
  }

  async saveLeaveType(){
    if(this.leaveTypeForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let labData = this.leaveTypeForm.value;
    const result = await firstValueFrom(this.configService.saveLeaveType(labData));
    if(result){
      this.toast.success(result.message);
      this.fetchLeaveType();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchLeaveType(){
    const result = await firstValueFrom(this.configService.loadLeaveType());
    this.leaveTypeList = result.data;
  }

  editLeaveType(leaveType:LeaveType){
    this.leaveTypeForm.patchValue(leaveType);
  }

  async deleteLeaveType(labId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteLeaveType(labId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchLeaveType();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.leaveTypeForm.reset();
    this.leaveTypeForm.patchValue({});
  }
  setupLeaveTypeForm(){
    this.leaveTypeForm = this.fb.group({
      id:null,
      leaveName:[null, Validators.required],
      description:[null],
    });
  }
  get field(){
    return this.leaveTypeForm.controls;
  }
}
