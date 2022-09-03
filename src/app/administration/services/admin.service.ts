import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { Billing, Employee, LabResult, LabTest, Patient, PatientAddmission } from '../payload/adminstration';

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

  // Patients
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

  // Patient Admissions
  savePatientAdmission(patientAdmission:PatientAddmission):Observable<any>{
    if(!patientAdmission.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient-admission`, patientAdmission);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient-admission`, patientAdmission);
  }
  loadPatientAdmissions():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient-admission/list`,);
  }
  deletePatientAdmission(patientAdmissionId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient-admission/${patientAdmissionId}`);
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

  // Lab Result
  saveLabResult(labResult:LabResult):Observable<any>{
    if(!labResult.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/lab-result`, labResult);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/lab-result`, labResult);
  }
  loadLabResults():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/lab-result/list`,);
  }
  deleteLabResult(labTestId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/lab-result/${labTestId}`);
  }

  // Billing
  saveBilling(billing:Billing):Observable<any>{
    if(!billing.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/billing`, billing);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/billing`, billing);
  }
  loadBillings():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/billing/list`,);
  }
  deleteBilling(billingId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/billing/${billingId}`);
  }
}
