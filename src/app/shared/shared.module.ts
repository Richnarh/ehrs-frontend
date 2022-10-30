import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddNewButtonComponent } from './add-new-button/add-new-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { PatientVitalComponent } from './patient-vital/patient-vital.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { HistoryComponent } from './history/history.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { DispensaryComponent } from './dispensary/dispensary.component';
import { IpdComponent } from './ipd/ipd.component';
import { LabComponent } from './lab/lab.component';
import { BillingComponent } from './billing/billing.component';
import { VitalFormComponent } from './vital-form/vital-form.component';
import { LabResultInfoComponent } from "./lab-result-info/lab-result-info.component";



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AddNewButtonComponent,
    SaveButtonComponent,
    CloseButtonComponent,
    PatientVitalComponent,
    PatientSearchComponent,
    HistoryComponent,
    DiagnosisComponent,
    DispensaryComponent,
    IpdComponent,
    LabComponent,
    BillingComponent,
    VitalFormComponent,
    LabResultInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    AddNewButtonComponent,
    SaveButtonComponent,
    CloseButtonComponent,
    PatientVitalComponent,
    PatientSearchComponent,
    LabComponent,
    IpdComponent,
    VitalFormComponent,
    FormsModule,
    ReactiveFormsModule,
    LabResultInfoComponent
  ]
})
export class SharedModule { }
