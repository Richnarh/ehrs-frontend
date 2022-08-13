import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { PatientComponent } from './patient/patient.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { JobRoleComponent } from './job-role/job-role.component';
import { RoomComponent } from './room/room.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { LabComponent } from './lab/lab.component';
import { LabResultComponent } from './lab-result/lab-result.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { BillingComponent } from './billing/billing.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PatientComponent,
    DepartmentComponent,
    EmployeeComponent,
    JobRoleComponent,
    RoomComponent,
    RoomTypeComponent,
    PatientAdmissionComponent,
    LabComponent,
    LabResultComponent,
    LabTestComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
