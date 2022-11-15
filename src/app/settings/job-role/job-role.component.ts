import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { JobRole } from 'src/app/payload/config';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
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

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;
  
  constructor(private eventProxyService: EventProxyService, private fb:FormBuilder, private configService:ConfigService, private lookupService:LookupService, private toast:ToastService) { }

  async ngOnInit(): Promise<void> {
    this.setupDeptForm();
    this.fetJobRoles();

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.SETTINGS));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Job Role'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add Job Role'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete Job Role'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
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
