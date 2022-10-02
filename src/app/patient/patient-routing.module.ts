import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLayoutComponent } from '../layouts/patient-layout/patient-layout.component';
import { DoctorActivityComponent } from './doctor-activity/doctor-activity.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: 'patient', component: PatientLayoutComponent,
    children: [
      { path: 'patient', component: PatientComponent },
      { path: 'admission', component: PatientAdmissionComponent },
      { path: 'activity', component: DoctorActivityComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
