import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Billing, Patient } from "src/app/patient/payload/patient";
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { PatientService } from "./../../patient/services/patient.service";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  pageView:PageView = PageView.listView();

  selectedPatient:Patient;

  billingList:Billing[];
  patientList:LookupItem[];
  
  opdSearchField:any="00024423DA";
  otherBill:number=0.0;
  searchDate:string = new Date().toJSON().slice(0,10).replace(/-/g,'-');

  constructor(private patientService:PatientService, private toast:ToastService,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.initLookups();
  }

  initiateBilling(billing:Billing){
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const patient = await firstValueFrom(this.lookupService.patient());

    this.patientList = patient.data;
  }

  async searchData(){
    this.selectedPatient = new Patient();
    this.billingList = [];
    if(this.opdSearchField == null || this.opdSearchField == ''){
      SweetMessage.error("Please enter OPD Number!");
      return;
    }
    const result = await firstValueFrom(this.patientService.findBills(this.opdSearchField));
    this.billingList.push(result.data);
    console.log(result.data);
    this.selectedPatient.id = result.data[0].patientId;
    this.selectedPatient.fullname = result.data[0].patientName;
  }

  async saveBilling(){
    
    const billingData:any = this.billingList.forEach(data =>{
      let bill:Billing = new Billing();
      bill.patientId = data.patientId;
      bill.admissionBill = data.admissionBill;
      bill.admissionBillId = data.admissionBillId;
      bill.labBill = data.labBill;
      bill.labBillId = data.labBillId;
      bill.prescriptionBill = data.prescriptionBill;
      bill.prescriptionBillId = data.prescriptionBillId;
    });

    console.log(billingData);

    const result = await firstValueFrom(this.patientService.saveBilling(new Billing()));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchBilling();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchBilling(){
    const result = await firstValueFrom(this.patientService.loadBillings());
    this.billingList = result.data;
  }

  editBilling(billing:Billing){
    this.pageView.resetToCreateView();
  }

  async deleteBilling(billingId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteBilling(billingId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchBilling();
    }else{
      this.toast.error(result.message);
    }
  }
  
}
