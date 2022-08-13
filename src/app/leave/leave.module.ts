import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { SpecialLeaveComponent } from './special-leave/special-leave.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LeaveRequestComponent,
    LeaveTypeComponent,
    SpecialLeaveComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    SharedModule
  ]
})
export class LeaveModule { }
