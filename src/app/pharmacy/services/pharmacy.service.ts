import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { Customer } from '../payload/pharmacy';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private readonly http:HttpClient) { }
  
  // Customer
  saveCustomer(customer:Customer):Observable<any>{
    if(!customer.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/customer`, customer);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/customer`, customer);
  }
  loadCustomers():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/customer/list`,);
  }
  deleteCustomer(customerId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/customer/${customerId}`);
  }
}
