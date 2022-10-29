import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LabTest } from 'src/app/patient/payload/patient';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { Employee } from "./../payload/adminstration";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http:HttpClient) { }

  // Employees
  saveEmployee(employee:Employee):Observable<any>{
    if(!employee.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/employee`, employee);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/employee`, employee);
  }
  loadEmployees():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/employee/list`,);
  }
  deleteEmployee(employeeId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/employee/${employeeId}`)
  }

  // Lab Tests
  saveLabTest(labTest:LabTest):Observable<any>{
    if(!labTest.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/labtest`, labTest);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/labtest`, labTest);
  }
  loadLabTests():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/labtest/list`,);
  }
  deleteLabTest(labTestId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/labtest/${labTestId}`);
  }

}
