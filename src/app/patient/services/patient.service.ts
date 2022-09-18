import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientVital } from 'src/app/payload/config';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { AssignDr, Patient, PatientAddmission } from '../payload/patient';

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
  savePatientVital(patientVital:PatientVital):Observable<any>{
    if(!patientVital.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient-vital`, patientVital);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient-vital`, patientVital);
  }
  loadPatientVital():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient-vital/list`,);
  }
  deletePatientVital(patientVitalId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient-vital/${patientVitalId}`);
  }
  
  getVitals(patientId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient-vital/patient/${patientId}`);
  }
  
    // Assign Dr
    saveAssignDr(assignDr:AssignDr):Observable<any>{
      if(!assignDr.id)
        return this.http.post<ApiResponse<any>>(`${env.endpoint}/assign-dr`, assignDr);
      else
        return this.http.put<ApiResponse<any>>(`${env.endpoint}/assign-dr`, assignDr);
    }
    loadAssignDr():Observable<any>{
      return this.http.get<ApiResponse<any>>(`${env.endpoint}/assign-dr/list`,);
    }
    deleteAssignDr(assignDrId:string):Observable<any>{
      return this.http.delete<ApiResponse<any>>(`${env.endpoint}/assign-dr/${assignDrId}`);
    }

  getAssignDr(patientId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/assign-dr/dr/${patientId}`);
  }


}
