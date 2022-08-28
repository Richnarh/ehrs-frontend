import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddNewButtonComponent } from './add-new-button/add-new-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { CloseButtonComponent } from './close-button/close-button.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AddNewButtonComponent,
    SaveButtonComponent,
    CloseButtonComponent
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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
