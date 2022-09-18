import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: '', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: '', loadChildren: () => import('./pharmacy/pharmacy.module').then(m => m.PharmacyModule) },
  { path: '', loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule) },
  { path: '', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
