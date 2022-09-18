import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RoomType } from 'src/app/payload/config';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {

  roomTypeForm:FormGroup;
  roomTypeList:RoomType[];
  constructor(private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly toast:ToastService) { }

  ngOnInit(): void {
    this.setupRoomTypeForm();

    this.fetchRoomType();
  }

  async saveRoomType(){
    if(this.roomTypeForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let labData = this.roomTypeForm.value;
    const result = await firstValueFrom(this.configService.saveRoomType(labData));
    if(result){
      this.toast.success(result.message);
      this.fetchRoomType();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchRoomType(){
    const result = await firstValueFrom(this.configService.loadRoomType());
    this.roomTypeList = result.data;
  }

  editRoomType(roomType:RoomType){
    this.roomTypeForm.patchValue(roomType);
  }

  async deleteRoomType(labId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteRoomType(labId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchRoomType();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.roomTypeForm.reset();
    this.roomTypeForm.patchValue({});
  }
  setupRoomTypeForm(){
    this.roomTypeForm = this.fb.group({
      id:null,
      wardName:[null, Validators.required],
    });
  }
  get field(){
    return this.roomTypeForm.controls;
  }
}
