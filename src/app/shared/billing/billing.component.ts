import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Patient } from "src/app/patient/payload/patient";
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { PatientService } from "./../../patient/services/patient.service";
import { Billing } from "./../../patient/payload/patient";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  pageView:PageView = PageView.listView();
  selectedPatient:Patient;
  patientId:any;

  billingList:Billing[];
  billings:Billing[];
  patientList:LookupItem[];
  
  opdSearchField:any="00024423DA";
  otherBill:number=0.0;
  totalBill:number=0.0;
  searchDate:string = new Date().toJSON().slice(0,10).replace(/-/g,'-');

  constructor(private patientService:PatientService, private toast:ToastService,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.initLookups();
  }

  async loadBillings(){
    this.pageView.resetToCreateView();
    const result = await firstValueFrom(this.patientService.laodBills(this.patientId));
    this.billings = result.data;
  }
  async initLookups(){
    const patient = await firstValueFrom(this.lookupService.patient());
    this.patientList = patient.data;
  }

  async searchData(){
    this.totalBill = 0.0;
    this.selectedPatient = new Patient();
    this.billingList = [];
    if(this.opdSearchField == null || this.opdSearchField == ''){
      SweetMessage.error("Please enter OPD Number!");
      return;
    }
    const result = await firstValueFrom(this.patientService.findBills(this.opdSearchField));
    this.billingList=result.data;
    this.selectedPatient.id = result.data.patientId;
    this.patientId = result.data.patientId;
    this.selectedPatient.fullname = result.data.patientName;

    result.data.map((item: Billing) =>{
      this.totalBill += item.admissionBill;
      this.totalBill += item.labBill;
      this.totalBill += item.prescriptionBill;
      this.totalBill += item.otherBill;
    });
  }

  async saveBilling(){
    const billingData:any = this.extractBills(this.billingList);
    const billing = billingData[0];
        
    console.log("Billing Data: ",billing, "patientId: ", this.selectedPatient.id);
    const result = await firstValueFrom(this.patientService.saveBilling(billing, this.patientId));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchBilling();
    }else{
      this.toast.error(result.message);
    }
  }

  extractBills(billingList:Billing[]){
    const billingData = billingList.map((data:Billing) =>{
      let bill:Billing = new Billing();
      bill.patientId = data.patientId;
      bill.admissionBill = data.admissionBill;
      bill.admissionBillId = data.admissionBillId;
      bill.labBill = data.labBill;
      bill.labBillId = data.labBillId;
      bill.prescriptionBill = data.prescriptionBill;
      bill.prescriptionBillId = data.prescriptionBillId;
      bill.otherBill = this.otherBill;
      return bill;
    });
    console.log("___: "+billingData);
    return billingData;
  }
  
  async fetchBilling(){
    const result = await firstValueFrom(this.patientService.loadBillings(this.patientId));
    this.billingList = result.data;
  }

  editBilling(billing:Billing){
    this.pageView.resetToCreateView();
  }

  async deleteBilling(billingId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientService.deleteBilling(billingId, this.patientId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchBilling();
    }else{
      this.toast.error(result.message);
    }
  }
  
}
