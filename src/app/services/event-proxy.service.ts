import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Subscription } from 'rxjs';
import { ApiResponse } from '../utils/apiResponse';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment as env } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventProxyService {
  private eventSubject = new BehaviorSubject<any>(undefined);

  firstComponent = new EventEmitter();
  subsVar:Subscription;

  constructor(private storageService:StorageService,private http:HttpClient) { }

  sendEvent(param: any) {
    this.eventSubject.next(param);
  }

  getEventSubject (): BehaviorSubject<any> {
    return this.eventSubject;
  }

  fireEvent(){
    this.firstComponent.emit();
  }

  fireEventData(data:any){
    this.firstComponent.emit(data);
  }

  loadPages(appModule:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/search/${appModule}/pages`);
  }

  async getModuleData(appModule:any){
    console.log('passed module: ', appModule);
 
    const result = await firstValueFrom(this.loadPages(appModule));

    console.log(result.data[0]);
  }
}
