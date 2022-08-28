import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Department } from 'src/app/payload/config';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  deptForm:FormGroup;
  employeeList:LookupItem[];
  departmentList:Department[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly lookupService:LookupService, private readonly toast:ToastService) { }

  ngOnInit(): void {
    this.setupDeptForm();
    this.initLookups();

    this.fetDepartments();
  }

  async initLookups(){
    const empData = await firstValueFrom(this.lookupService.employee());
    this.employeeList = empData.data;
  }

  async saveDepartment(){
    if(this.deptForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let deptData = this.deptForm.value;
    const result = await firstValueFrom(this.configService.saveDepartment(deptData));
    if(result){
      this.toast.success(result.message);
      this.fetDepartments();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetDepartments(){
    const result = await firstValueFrom(this.configService.loadDepartment());
    this.departmentList = result.data;
  }

  editDepartment(dept:Department){
    this.deptForm.patchValue(dept);
  }

  async deleteDepartment(department:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteDepartment(department));
    if(result.success){
      this.toast.success(result.message);
      this.fetDepartments();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.deptForm.reset();
    this.deptForm.patchValue({});
  }
  setupDeptForm(){
    this.deptForm = this.fb.group({
      id:null,
      departmentCode:[null],
      departmentName:[null, Validators.required],
      hodId:[null]
    });
  }

  get field(){
    return this.deptForm.controls;
  }
}
