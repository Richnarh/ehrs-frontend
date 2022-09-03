import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { LeaveRequest } from '../payload/leave';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  pageView:PageView = PageView.listView();

  leaveRequestList:LeaveRequest[];

  departmentList:LookupItem[];
  leaveStatusList:LookupItem[];
  leaveTypeList:LookupItem[];
  
  leaveRequestForm:FormGroup;
  constructor(private readonly leaveService:LeaveService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupLeaveReqForm();
    this.initLookups();
    this.fetchLeaveRequest();
  }

  initiateLeaveReq(){
    this.leaveRequestForm.reset();
    this.leaveRequestForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const leaveType = await firstValueFrom(this.lookupService.leaveType());
    const leaveStatus = await firstValueFrom(this.lookupService.leaveStatus());
    const dept = await firstValueFrom(this.lookupService.department());
    
    this.leaveTypeList = leaveType.data;
    this.leaveStatusList = leaveStatus.data;
    this.departmentList = dept.data;
  }

  async saveLeaveRequest(){
    if(this.leaveRequestForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let leaveReqData = this.leaveRequestForm.value;
    const result = await firstValueFrom(this.leaveService.saveLeaveRequest(leaveReqData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchLeaveRequest();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchLeaveRequest(){
    const result = await firstValueFrom(this.leaveService.loadLeaveRequests());
    this.leaveRequestList = result.data;
  }

  editLeaveRequest(leaveRequest:LeaveRequest){
    this.leaveRequestForm.patchValue({});
    this.leaveRequestForm.patchValue(leaveRequest);
    this.pageView.resetToCreateView();
  }

  async deleteLeaveRequest(leaveRequestId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.leaveService.deleteLeaveRequest(leaveRequestId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchLeaveRequest();
    }else{
      this.toast.error(result.message);
    }
  }

  setupLeaveReqForm(){
    this.leaveRequestForm = this.fb.group({
      id:null,
      leaveTypeId:[null, Validators.required],
      departmentId:[null, Validators.required],
      periodFrom:[new Date(), Validators.required],
      periodTo:[new Date(), Validators.required],
      comment:[null],
      totalLeaveDays:[null, Validators.required],
      leaveStatus:[null, Validators.required],
    });
  }
  
  get field(){
    return this.leaveRequestForm.controls;
  }
}
