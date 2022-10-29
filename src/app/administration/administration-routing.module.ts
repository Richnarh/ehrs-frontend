import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminLayoutComponent,
    children: [
      { path: 'employee', component: EmployeeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
