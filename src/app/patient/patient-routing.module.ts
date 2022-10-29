import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLayoutComponent } from '../layouts/patient-layout/patient-layout.component';
import { BillingComponent } from "../shared/billing/billing.component";
import { DoctorActivityComponent } from './doctor-activity/doctor-activity.component';
import { LabResultComponent } from './lab-result/lab-result.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: 'patient', component: PatientLayoutComponent,
    children: [
      { path: 'patient', component: PatientComponent },
      { path: 'admission', component: PatientAdmissionComponent },
      { path: 'activity', component: DoctorActivityComponent },
      { path: 'lab-result', component: LabResultComponent },
      { path: 'billing', component: BillingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
