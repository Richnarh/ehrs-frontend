import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { LocalKeys } from 'src/app/utils/LocalKeys';
import { AuthResponse } from '../payload/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  currentUser: any;
  loggedInSource = new Subject<boolean>()
  loggedIn$ = this.loggedInSource.asObservable()

  constructor(
    private storage: StorageService
  ) { }

  public triggerLogin(isLoggedIn: boolean) {
    console.log('initialised....')
    this.loggedInSource.next(isLoggedIn)
  }

  public isLoggedIn() {
    console.log('!!this.currentUser => ',!!this.currentUser);
    return !!this.currentUser
  }

  public logout(): void {
    this.currentUser = null
    localStorage.clear();
  }

  public registerLogin(payload: any)
  {
    console.log('payload => ', payload);
    this.storage.setLocalObject(LocalKeys.SessionId, btoa(payload.sessionId));
    this.storage.setLocalObject(LocalKeys.CurrenUserId, JSON.stringify(payload.id));
    this.storage.setLocalObject(LocalKeys.CurrenUser, JSON.stringify(payload));

    this.currentUser = payload;

    // console.log('this.storage.getToken => ', this.storage.getToken());
    // console.log('currentUser => ', this.currentUser);
  }
}

