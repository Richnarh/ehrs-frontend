import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyLayoutComponent } from '../layouts/pharmacy-layout/pharmacy-layout.component';
import { CustomerComponent } from './customer/customer.component';
import { StockReceiptComponent } from './stock-receipt/stock-receipt.component';

const routes: Routes = [
  {
    path: 'pharmacy', component: PharmacyLayoutComponent,
    children: [
      { path: 'customer', component: CustomerComponent },
      { path: 'stock', component: StockReceiptComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
