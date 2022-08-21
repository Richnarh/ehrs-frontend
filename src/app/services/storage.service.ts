import { Injectable } from '@angular/core';
import { LocalKeys } from '../utils/LocalKeys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setToken(token:string){
      localStorage.setItem(LocalKeys.UUID,token);
  }
  public getToken(){
      return localStorage.getItem(LocalKeys.UUID);
  }
  public removeToken(){
      return localStorage.removeItem(LocalKeys.UUID);
  }
  public setLocalObject(key:string, value:string){
      return localStorage.setItem(key, value);
  }
  public getLocalObject(key:string){
      return localStorage.getItem(key);
  }

  public clearToken(){
    localStorage.clear();
  }
}