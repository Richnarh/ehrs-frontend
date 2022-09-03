import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { Customer } from '../payload/pharmacy';
import { PharmacyService } from '../services/pharmacy.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  pageView:PageView = PageView.listView();

  customerList:Customer[];
  clientTypeList:LookupItem[];
  customerForm:FormGroup;
  constructor(private readonly pharmacyService:PharmacyService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupcustomerForm();
    this.initLookups();
    this.fetchCustomer();
  }

  initiateCustomer(){
    this.customerForm.reset();
    this.customerForm.patchValue({});
    this.pageView.resetToCreateView();
  }
  async initLookups(){
    const clientType = await firstValueFrom(this.lookupService.clientType());

    this.clientTypeList = clientType.data;
  }

  async saveCustomer(){
    if(this.customerForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let CustomerData = this.customerForm.value;
    const result = await firstValueFrom(this.pharmacyService.saveCustomer(CustomerData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchCustomer();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchCustomer(){
    const result = await firstValueFrom(this.pharmacyService.loadCustomers());
    this.customerList = result.data;
  }

  editCustomer(Customer:Customer){
    this.customerForm.patchValue({});
    this.customerForm.patchValue(Customer);
    this.pageView.resetToCreateView();
  }

  async deleteCustomer(CustomerId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.pharmacyService.deleteCustomer(CustomerId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchCustomer();
    }else{
      this.toast.error(result.message);
    }
  }
  setupcustomerForm(){
    this.customerForm = this.fb.group({
      id:null,
      clientType:[null, Validators.required],
      customerName:[null, Validators.required],
      phone:[null, Validators.required],
      address:[null],
      emailAddress:[null],
      description:[null],
    });
  }
  
  get field(){
    return this.customerForm.controls;
  }

}
