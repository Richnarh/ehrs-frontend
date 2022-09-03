import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { LabComponent } from './lab/lab.component';
import { EmployeeComponent } from './employee/employee.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { PatientComponent } from './patient/patient.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminLayoutComponent,
    children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'patient-adminission', component: PatientAdmissionComponent },
      { path: 'billing', component: BillingComponent },
      
      { path: 'lab', component: LabComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
