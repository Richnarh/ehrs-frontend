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

  // ENUMS
  title():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/title`,)
  }
  idType():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/id-type`,)
  }
  gender():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/gender`,)
  }
  patientCategory():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/patient-category`,)
  }
}
