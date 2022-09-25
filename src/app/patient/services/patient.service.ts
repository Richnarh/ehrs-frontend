import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { AssignDr, Patient, PatientAddmission, PatientVital } from '../payload/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private readonly http:HttpClient) { }
  
  findPatient(opdSearchField:any):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/search/${opdSearchField}`,);
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

  // Patient Vital
  savePatientVital(patientVital:PatientVital, patientId:string):Observable<any>{
    if(!patientVital.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/vital`, patientVital);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/vital`, patientVital);
  }
  loadPatientVital(patientId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/vital/list`,);
  }
  deletePatientVital(vitalId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/vital/${vitalId}`);
  }
  
  getVitals(patientId:string, vitalId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/vital/${vitalId}`);
  }
  
  // Assign Dr
  saveAssignDr(assignDr:AssignDr, patientId:string):Observable<any>{
    if(!assignDr.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/assign-dr`, assignDr);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/assign-dr`, assignDr);
  }
  loadAssignDr(patientId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/assign-dr/list`,);
  }
  deleteAssignDr(assignDrId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/assign-dr/${assignDrId}`);
  }

  getAssignDr(patientId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/assign-dr/${patientId}`);
  }


}
