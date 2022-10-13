import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LabResult } from 'src/app/administration/payload/adminstration';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment";
import { AssignDr, Complain, DrReport, LabTest, Patient, PatientAddmission, PatientVital, Prescription } from '../payload/patient';

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
  savePatientAdmission(patientAdmission:PatientAddmission, patientId:string):Observable<any>{
    if(!patientAdmission.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/admission`, patientAdmission);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/admission`, patientAdmission);
  }
  loadPatientAdmissions(patientId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/admission/list`,);
  }
  deletePatientAdmission(patientAdmissionId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/admission/${patientAdmissionId}`);
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
  loadPatientAssignedToDr(doctorId:string){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/assign-dr/${doctorId}/doctor`);
  }

  // Precription
  savePrescription(prescription:Prescription, patientId:string):Observable<any>{
    if(!prescription.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/prescription`, prescription);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/prescription`, prescription);
  }
  loadPrescription(patientId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/prescription/list`,);
  }
  deletePrescription(prescriptionId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/prescription/${prescriptionId}`);
  }

  // Precription
  saveLabTest(labTest:LabTest, patientId:string):Observable<any>{
    if(!labTest.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/labtest`, labTest);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/labtest`, labTest);
  }
  loadLabTest(patientId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/labtest/list`,);
  }
  deleteLabTest(labTestId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/labtest/${labTestId}`);
  }

  // Dr Report
  saveDrReport(drReport:DrReport, patientId:string):Observable<any>{
    if(!drReport.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/drreport`, drReport);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/drreport`, drReport);
  }
  loadDrReport(patientId:string, complainId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/drreport/${complainId}/list`,);
  }
  deleteDrReport(drReportId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/drreport/${drReportId}`);
  }

  // Patient Complains
  saveComplains(complain:Complain, patientId:string):Observable<any>{
    if(!complain.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/complain`, complain);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/complain`, complain);
  }
  loadComplains(patientId:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/complain/list`,);
  }
  deleteComplains(complainId:string, patientId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/patient/${patientId}/complain/${complainId}`);
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

  searchData(searchDate:string, opdSearchField:string):Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/search/${searchDate}/${opdSearchField}`)
  }
}
