import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PharmacyLayoutComponent } from '../layouts/pharmacy-layout/pharmacy-layout.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    PharmacyLayoutComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    SharedModule
  ]
})
export class PharmacyModule { }
