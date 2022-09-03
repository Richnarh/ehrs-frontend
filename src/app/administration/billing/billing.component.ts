import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { Billing } from '../payload/adminstration';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  pageView:PageView = PageView.listView();

  billingList:Billing[];
  patientList:LookupItem[];
  billingForm:FormGroup;
  constructor(private readonly adminService:AdminService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupBillingForm();
    this.initLookups();
    this.fetchBilling();
  }

  initiateBilling(){
    this.billingForm.reset();
    this.billingForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const patient = await firstValueFrom(this.lookupService.patient());

    this.patientList = patient.data;
  }

  async saveBilling(){
    if(this.billingForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let BillingData = this.billingForm.value;
    const result = await firstValueFrom(this.adminService.saveBilling(BillingData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchBilling();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchBilling(){
    const result = await firstValueFrom(this.adminService.loadBillings());
    this.billingList = result.data;
  }

  editBilling(billing:Billing){
    this.billingForm.patchValue({});
    this.billingForm.patchValue(billing);
    this.pageView.resetToCreateView();
  }

  async deleteBilling(billingId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.adminService.deleteBilling(billingId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchBilling();
    }else{
      this.toast.error(result.message);
    }
  }
  setupBillingForm(){
    this.billingForm = this.fb.group({
      id:null,
      patientId:[null, Validators.required],
      doctorCharges:[0.0],
      labCharges:[0.0],
      roomCharges:[0.0]
    });
  }
  
  get field(){
    return this.billingForm.controls;
  }

}
