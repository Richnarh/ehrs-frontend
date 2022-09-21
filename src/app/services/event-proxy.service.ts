import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventProxyService {
  private eventSubject = new BehaviorSubject<any>(undefined);
  constructor() { }

  sendEvent(param: any) {
    this.eventSubject.next(param);
  }

  getEventSubject (): BehaviorSubject<any> {
    return this.eventSubject;
  }
}
