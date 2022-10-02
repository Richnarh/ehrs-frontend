import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Frequency } from 'src/app/payload/config';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent implements OnInit {
  frequencyForm:FormGroup;
  frequency:Frequency;
  frequencyList:Frequency[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly toast:ToastService) { }

  ngOnInit(): void {
    this.setupFrequencyForm();
    this.fetchFrequency();
  }

  async saveFrequency(){
    if(this.frequencyForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let frequencyData = this.frequencyForm.value;
    const result = await firstValueFrom(this.configService.saveFrequency(frequencyData));
    if(result){
      this.toast.success(result.message);
      this.fetchFrequency();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchFrequency(){
    const result = await firstValueFrom(this.configService.loadFrequency());
    this.frequencyList = result.data;
  }

  editFrequency(frequency:Frequency){
    this.frequencyForm.patchValue(frequency);
  }

  async deleteFrequency(frequencytId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteFrequency(frequencytId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchFrequency();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.frequencyForm.reset();
    this.frequencyForm.patchValue({});
  }
  setupFrequencyForm(){
    this.frequencyForm = this.fb.group({
      id:null,
      frequencyName:[null, Validators.required],
    });
  }
  get field(){
    return this.frequencyForm.controls;
  }
}
