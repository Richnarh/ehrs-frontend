import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Lab } from 'src/app/payload/config';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
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

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;

  constructor(private eventProxyService: EventProxyService,private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly lookupService:LookupService, private readonly toast:ToastService) { }


  async ngOnInit(): Promise<void> {
    this.setupLabForm();
    this.initLookups();

    this.fetchLab();

   const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.SETTINGS));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Lab'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add Lab'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete Lab'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
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
