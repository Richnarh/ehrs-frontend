import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { Inventory } from '../payload/pharmacy';
import { PharmacyService } from '../services/pharmacy.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  pageView:PageView = PageView.listView();

  inventory:Inventory;
  inventoryList:Inventory[];

  inventoryForm:FormGroup;
  vitalForm:FormGroup;
  
  constructor(private readonly pharmacyService:PharmacyService, private readonly toast:ToastService,private readonly fb:FormBuilder,private lookupService:LookupService,) { }

  ngOnInit(): void {
    this.setupinventoryForm();
    this.fetchInventory();
  }

  initInventory(){
    this.inventoryForm.reset();
    this.inventoryForm.patchValue({});
    this.pageView.resetToCreateView();
  }

  resetVitalForm(){
    this.inventoryForm.reset();
  }

  async save(){
    if(this.inventoryForm.invalid){
      this.toast.error('Some fields are required!');
      return;
    }
    let inventoryData = this.inventoryForm.value;
    const result = await firstValueFrom(this.pharmacyService.saveInventory(inventoryData));
    if(result){
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.fetchInventory();
    }else{
      this.toast.error(result.message);
    }
  }
  
  async fetchInventory(){
    const result = await firstValueFrom(this.pharmacyService.loadInventorys());
    this.inventoryList = result.data;
  }

  editInventory(inventoryData:Inventory){
    this.inventoryForm.patchValue({});
    this.inventoryForm.patchValue(inventoryData);
    this.pageView.resetToCreateView();
  }

  async deleteInventory(inventoryId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.pharmacyService.deleteInventory(inventoryId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchInventory();
    }else{
      this.toast.error(result.message);
    }
  }
  
  setupinventoryForm(){
    this.inventoryForm = this.fb.group({
      id:null,
      productName:[null, Validators.required],
      batchNo:[null, Validators.required],
      quantity:[null, Validators.required],
      reorderLevel:[null],
      expiryDate:[new Date()],
      amount:[0, Validators.required],
      sellingPrice:[null, Validators.required],
    });
  }
  
  get field(){
    return this.inventoryForm.controls;
  }
}
