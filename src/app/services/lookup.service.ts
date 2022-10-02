import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LookupItem } from '../payload/lookupItem';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }

  // ENTITIES
  jobRole():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/job-role`,);
  }
  employee():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/employee`,);
  }
  department():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/department`,);
  }
  roomType():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/room-type`,);
  }
  room():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/room`,);
  }
  lab():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/lab`,);
  }
  labTest():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/labtest`,);
  }
  patient():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/patient`,);
  }
  clientType():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/client-type`,);
  }
  leaveType():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/leave-type`,);
  }
  frequency():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/frequency`,);
  }
  drReport():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/dr-report`,);
  }

  // ENUMS
  title():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/title`,);
  }
  idType():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/id-type`,);
  }
  gender():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/gender`,);
  }
  patientCategory():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/patient-category`,);
  }
  leaveStatus():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/leave-status`,);
  }
  assignPatient():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/assign-patient`,);
  }
}
