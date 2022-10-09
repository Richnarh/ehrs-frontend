import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { Inventory } from '../payload/pharmacy';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private readonly http:HttpClient) { }
  
  // Inventory
  saveInventory(inventory:Inventory):Observable<any>{
    if(!inventory.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/inventory`, inventory);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/inventory`, inventory);
  }
  loadInventorys():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/inventory/list`,);
  }
  deleteInventory(inventoryId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/inventory/${inventoryId}`);
  }
}
