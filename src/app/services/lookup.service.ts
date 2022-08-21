import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LookupItem } from '../payload/LookupItem';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }

  jobRole():Observable<any>{
    return this.http.get<ApiResponse<LookupItem[]>>(`${env.lookupEndpoint}/job-role`,);
  }
  title():Observable<any>{
    return this.http.get<ApiResponse<LookupItem[]>>(`${env.lookupEndpoint}/title`,)
  }
}
