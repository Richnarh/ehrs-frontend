import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { EmployeeComponent } from './employee/employee.component';
import { LabResultComponent } from './lab-result/lab-result.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminLayoutComponent,
    children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'patient-adminission', component: PatientAdmissionComponent },
      
      { path: 'lab-test', component: LabTestComponent },
      { path: 'lab-result', component: LabResultComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
