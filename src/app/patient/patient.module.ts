import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PatientLayoutComponent } from '../layouts/patient-layout/patient-layout.component';
import { PatientComponent } from './patient/patient.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { AssignDrComponent } from './assign-dr/assign-dr.component';
import { DrReportComponent } from './dr-report/dr-report.component';
import { DoctorActivityComponent } from './doctor-activity/doctor-activity.component';


@NgModule({
  declarations: [
    PatientLayoutComponent,
    PatientComponent,
    PatientAdmissionComponent,
    AssignDrComponent,
    DrReportComponent,
    DoctorActivityComponent,
    
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
