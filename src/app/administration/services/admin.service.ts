import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { Employee, Patient } from '../payload/adminstration';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http:HttpClient) { }

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

  savePatient(patient:Patient):Observable<any>{
    if(!patient.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient`, patient);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient`, patient);
  }
  loadPatients():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/list`,);
  }
  deletePatient(patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}`)
  }
}
