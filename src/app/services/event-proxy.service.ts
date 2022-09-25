import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventProxyService {
  private eventSubject = new BehaviorSubject<any>(undefined);

  firstComponent = new EventEmitter();
  subsVar:Subscription;

  constructor() { }

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
}
