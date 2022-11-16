import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Room } from 'src/app/payload/config';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AppModules } from 'src/app/services/modules';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomForm:FormGroup;
  roomTypeList:LookupItem[];
  roomList:Room[];

  pages:any;
  edit:string;editb:boolean;
  delv:string;delvb:boolean;
  ad:string;adb:boolean;

  constructor(private eventProxyService: EventProxyService,private readonly fb:FormBuilder, private readonly configService:ConfigService, private readonly lookupService:LookupService, private readonly toast:ToastService) { }

  async ngOnInit(): Promise<void> {
    this.setupDeptForm();
    this.initLookups();

    this.fetchRoom();

    
    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.SETTINGS));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){
      if(i.pageName === 'Edit Ward'){
        this.edit = i.pageName;
        this.editb = i.userActivePage;
      }
      if(i.pageName === 'Add Ward'){
        this.ad = i.pageName;
        this.adb = i.userActivePage;
      }
      if(i.pageName === 'Delete Ward'){
        this.delv = i.pageName;
        this.delvb = i.userActivePage;
      }
    }
  }

  async initLookups(){
    const roomType = await firstValueFrom(this.lookupService.roomType());
    this.roomTypeList = roomType.data;
  }

  async saveRoom(){
    if(this.roomForm.invalid){
      this.toast.error('Some fields are required');
      return;
    }
    let roomData = this.roomForm.value;
    const result = await firstValueFrom(this.configService.saveRoom(roomData));
    if(result){
      this.toast.success(result.message);
      this.fetchRoom();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  async fetchRoom(){
    const result = await firstValueFrom(this.configService.loadRoom());
    this.roomList = result.data;
  }

  editRoom(room:Room){
    this.roomForm.patchValue(room);
  }

  async deleteRoom(roomId:string){
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.configService.deleteRoom(roomId));
    if(result.success){
      this.toast.success(result.message);
      this.fetchRoom();
      this.resetForm();
    }else{
      this.toast.error(result.message);
    }
  }

  resetForm(){
    this.roomForm.reset();
    this.roomForm.patchValue({});
  }
  setupDeptForm(){
    this.roomForm = this.fb.group({
      id:null,
      wardNo:[null, Validators.required],
      wardTypeId:[null, Validators.required],
      description:[null]
    });
  }

  get field(){
    return this.roomForm.controls;
  }
}
