import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { Employee } from '../payload/adminstration';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  pageView:PageView = PageView.listView();

  constructor(private readonly adminService:AdminService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  employeeForm:FormGroup;
  employee:Employee;
  employeeList:Employee[]=[];
  jobRoleList:LookupItem[];
  empList:LookupItem[];
  idTypeList:LookupItem[];
  departmentList:LookupItem[];
  titleList:LookupItem[];
  errorMessage="This field is required";

  ngOnInit(): void {
    this.setupEmployeeForm();
    this.initLookups();
    this.fetEmployees();
  }

  initEmployee(){
    this.employeeForm.reset();
    this.employeeForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async saveEmpoyee(){
    if(this.employeeForm.invalid){
      this.toast.error(this.errorMessage);
      return;
    }
    let empData = this.employeeForm.value;
    const result = await firstValueFrom(this.adminService.saveEmployee(empData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetEmployees();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetEmployees(){
    const result = await firstValueFrom(this.adminService.loadEmployees());
    this.employeeList = result.data;
  }

  editEmployee(empData:Employee){
    this.employeeForm.patchValue({});
    this.employeeForm.patchValue(empData);
    this.pageView.resetToCreateView();
  }

  async deleteEmployee(employeeId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.adminService.deleteEmployee(employeeId));
    if(result.success){
      this.toast.success(result.message);
      this.fetEmployees();
    }else{
      this.toast.error(result.message);
    }
  }

  async initLookups(){
    const jobRole = await firstValueFrom(this.lookupService.jobRole());
    const department = await firstValueFrom(this.lookupService.department());
    const idType = await firstValueFrom(this.lookupService.idType());
    const title = await firstValueFrom(this.lookupService.title());

    this.jobRoleList = jobRole.data;
    this.departmentList = department.data;
    this.idTypeList = idType.data;
    this.titleList = title.data;
  }

  setupEmployeeForm(){
    this.employeeForm = this.fb.group({
      id:null,
      title:[null, Validators.required],
      jobRoleId:[null, Validators.required],
      firstname:[null, Validators.required],
      middlename:[null],
      lastname:[null, Validators.required],
      emailAddress:[null],
      phoneNumber:[null, Validators.required],
      address:[null],
      idType:[null, Validators.required],
      idNumber: [null, Validators.required],
      ssnitNo: [null],
      departmentId: [null, Validators.required]
    });
  }
  
  get field(){
    return this.employeeForm.controls;
  }
}
