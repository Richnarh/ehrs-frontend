import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { PatientComponent } from './patient/patient.component';
import { EmployeeComponent } from './employee/employee.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { LabResultComponent } from './lab-result/lab-result.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { BillingComponent } from './billing/billing.component';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    PatientComponent,
    EmployeeComponent,
    PatientAdmissionComponent,
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
