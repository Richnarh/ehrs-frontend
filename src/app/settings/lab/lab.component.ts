import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Lab } from 'src/app/payload/config';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-lab-setting',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {

  labForm:FormGroup;
  employeeList:LookupItem[];
  labList:Lab[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly lookupService:LookupService, private readonly toast:ToastService) { }


  ngOnInit(): void {
    this.setupLabForm();
    this.initLookups();

    this.fetchLab();
  }
  async initLookups(){
    const empData = await firstValueFrom(this.lookupService.employee());
    this.employeeList = empData.data;
  }

  async saveLab(){
    if(this.labForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let labData = this.labForm.value;
    const result = await firstValueFrom(this.configService.saveLab(labData));
    if(result){
      this.toast.success(result.message);
      this.fetchLab();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchLab(){
    const result = await firstValueFrom(this.configService.loadLab());
    this.labList = result.data;
  }

  editLab(dept:Lab){
    this.labForm.patchValue(dept);
  }

  async deleteLab(labId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteLab(labId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchLab();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.labForm.reset();
    this.labForm.patchValue({});
  }
  setupLabForm(){
    this.labForm = this.fb.group({
      id:null,
      unitNo:null,
      unitName:[null, Validators.required],
      unitHeadId:[null, Validators.required]
    });
  }
  get field(){
    return this.labForm.controls;
  }
}
