import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { LabTestComponent } from './lab-test/lab-test.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    EmployeeComponent,
    LabTestComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
