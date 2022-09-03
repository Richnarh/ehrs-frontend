import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveLayoutComponent } from '../layouts/leave-layout/leave-layout.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SpecialLeaveComponent } from './special-leave/special-leave.component';

const routes: Routes = [
  {
    path: 'leave', component: LeaveLayoutComponent,
    children: [
      { path: 'leave-request', component: LeaveRequestComponent },
      { path: 'special-leave', component: SpecialLeaveComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
