import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsLayoutComponent } from '../layouts/settings-layout/settings-layout.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  {
     path: 'settings', component: SettingsLayoutComponent,
     children: [
       { path: 'config', component: ConfigComponent },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
