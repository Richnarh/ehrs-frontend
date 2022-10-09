import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyLayoutComponent } from '../layouts/pharmacy-layout/pharmacy-layout.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: 'pharmacy', component: PharmacyLayoutComponent,
    children: [
      { path: 'inventory', component: InventoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
