import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { JobRole } from 'src/app/payload/config';
import { LookupService } from 'src/app/services/lookup.service';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-job-role',
  templateUrl: './job-role.component.html',
  styleUrls: ['./job-role.component.scss']
})
export class JobRoleComponent implements OnInit {
  jobRoleForm:FormGroup;
  jobRoleList:JobRole[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly lookupService:LookupService, private readonly toast:ToastService) { }

  ngOnInit(): void {
    this.setupDeptForm();
    this.fetJobRoles();
  }

  async saveJobRole(){
    if(this.jobRoleForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let jobRoleData = this.jobRoleForm.value;
    const result = await firstValueFrom(this.configService.savejobRole(jobRoleData));
    if(result){
      this.toast.success(result.message);
      this.fetJobRoles();
    }else{
      this.toast.error(result.message);
    }
  }

  editJobRole(jobRole:JobRole){
    this.jobRoleForm.patchValue(jobRole);
  }
  async fetJobRoles(){
    const result = await firstValueFrom(this.configService.loadJobRoles());
    this.jobRoleList = result.data;
  }

  async deleteJobRole(jobRoleId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteJobRole(jobRoleId));
    if(result.success){
      this.toast.success(result.message);
      this.fetJobRoles();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.jobRoleForm.reset();
    this.jobRoleForm.patchValue({});
  }
  setupDeptForm(){
    this.jobRoleForm = this.fb.group({
      id:null,
      roleName:[null, Validators.required],
      description:[null],
      hodId:[null]
    });
  }

  get field(){
    return this.jobRoleForm.controls;
  }
}
