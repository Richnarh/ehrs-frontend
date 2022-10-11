import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { TestType } from 'src/app/payload/config';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-test-type',
  templateUrl: './test-type.component.html',
  styleUrls: ['./test-type.component.scss']
})
export class TestTypeComponent implements OnInit {
  testTypeForm:FormGroup;
  testTypeList:TestType[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly toast:ToastService) { }

  ngOnInit(): void {
    this.setupTestTypeForm();

    this.fetchTestType();
  }

  async saveTestType(){
    if(this.testTypeForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let testTypeData = this.testTypeForm.value;
    const result = await firstValueFrom(this.configService.saveTestType(testTypeData));
    if(result){
      this.toast.success(result.message);
      this.fetchTestType();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchTestType(){
    const result = await firstValueFrom(this.configService.loadTestType());
    this.testTypeList = result.data;
  }

  editTestType(testType:TestType){
    this.testTypeForm.patchValue(testType);
  }

  async deleteTestType(testTypeId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteTestType(testTypeId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchTestType();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.testTypeForm.reset();
    this.testTypeForm.patchValue({});
  }
  setupTestTypeForm(){
    this.testTypeForm = this.fb.group({
      id:null,
      testTypeName:[null, Validators.required],
      description:[null],
    });
  }
  get field(){
    return this.testTypeForm.controls;
  }
}
