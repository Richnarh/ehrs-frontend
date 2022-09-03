import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { SpecialLeave } from '../payload/leave';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-special-leave',
  templateUrl: './special-leave.component.html',
  styleUrls: ['./special-leave.component.scss']
})
export class SpecialLeaveComponent implements OnInit {
  pageView:PageView = PageView.listView();

  specialLeaveList:SpecialLeave[];

  employeeList:LookupItem[];
  leaveTypeList:LookupItem[];
  
  specialLeaveForm:FormGroup;
  constructor(private readonly leaveService:LeaveService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupLeaveReqForm();
    this.initLookups();
    this.fetchSpecialLeave();
  }

  initiateSpecialLeave(){
    this.specialLeaveForm.reset();
    this.specialLeaveForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const leaveType = await firstValueFrom(this.lookupService.leaveType());
    const emp = await firstValueFrom(this.lookupService.employee());
    
    this.leaveTypeList = leaveType.data;
    this.employeeList = emp.data;
  }

  async saveSpecialLeave(){
    if(this.specialLeaveForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let leaveReqData = this.specialLeaveForm.value;
    const result = await firstValueFrom(this.leaveService.saveSpecialLeave(leaveReqData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchSpecialLeave();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchSpecialLeave(){
    const result = await firstValueFrom(this.leaveService.loadSpecialLeaves());
    this.specialLeaveList = result.data;
  }

  editSpecialLeave(specialLeave:SpecialLeave){
    this.specialLeaveForm.patchValue({});
    this.specialLeaveForm.patchValue(specialLeave);
    this.pageView.resetToCreateView();
  }

  async deleteSpecialLeave(specialLeaveId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.leaveService.deleteSpecialLeave(specialLeaveId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchSpecialLeave();
    }else{
      this.toast.error(result.message);
    }
  }

  setupLeaveReqForm(){
    this.specialLeaveForm = this.fb.group({
      id:null,
      leaveTypeId:[null, Validators.required],
      employeeId:[null, Validators.required],
      maxNumberOfDays:[0, Validators.required],
      purpose:[null, Validators.required],
      description:[null],
    });
  }
  
  get field(){
    return this.specialLeaveForm.controls;
  }
}
