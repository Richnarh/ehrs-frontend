import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { DepartmentComponent } from './department/department.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { JobRoleComponent } from './job-role/job-role.component';
import { LabComponent } from './lab/lab.component';
import { RoomComponent } from './room/room.component';
import { SettingsLayoutComponent } from '../layouts/settings-layout/settings-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ConfigComponent } from './config/config.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { FrequencyComponent } from './frequency/frequency.component';
import { TestTypeComponent } from './test-type/test-type.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    RoomTypeComponent,
    JobRoleComponent,
    LabComponent,
    RoomComponent,
    SettingsLayoutComponent,
    LeaveTypeComponent,
    ConfigComponent,
    FrequencyComponent,
    TestTypeComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
