import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { LeaveRequest, SpecialLeave } from '../payload/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private readonly http:HttpClient) { }
  
  // Leave Request
  saveLeaveRequest(leaveRequest:LeaveRequest):Observable<any>{
    if(!leaveRequest.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/leave-request`, leaveRequest);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/leave-request`, leaveRequest);
  }
  loadLeaveRequests():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/leave-request/list`,);
  }
  deleteLeaveRequest(leaveRequestId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/leave-request/${leaveRequestId}`);
  }
  
  // Special Leave
  saveSpecialLeave(specialLeave:SpecialLeave):Observable<any>{
    if(!specialLeave.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/special-leave`, specialLeave);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/special-leave`, specialLeave);
  }
  loadSpecialLeaves():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/special-leave/list`,);
  }
  deleteSpecialLeave(specialLeaveId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/special-leave/${specialLeaveId}`);
  }
}
