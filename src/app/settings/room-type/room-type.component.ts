import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RoomType } from 'src/app/payload/config';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { AppModules } from 'src/app/services/modules';
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

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;

  constructor(private eventProxyService: EventProxyService, private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly toast:ToastService) { }

  async ngOnInit(): Promise<void> {
    this.setupRoomTypeForm();
    this.fetchRoomType();

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.SETTINGS));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Room Type'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add Room Type'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete Room Type'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
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
