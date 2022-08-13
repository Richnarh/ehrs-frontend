import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { StockReceiptComponent } from './stock-receipt/stock-receipt.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CustomerComponent,
    StockReceiptComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    SharedModule
  ]
})
export class PharmacyModule { }
