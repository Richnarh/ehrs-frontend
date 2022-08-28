import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SpecialLeaveComponent } from './special-leave/special-leave.component';
import { SharedModule } from '../shared/shared.module';
import { LeaveLayoutComponent } from '../layouts/leave-layout/leave-layout.component';


@NgModule({
  declarations: [
    LeaveRequestComponent,
    SpecialLeaveComponent,
    LeaveLayoutComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    SharedModule
  ]
})
export class LeaveModule { }
