import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, JobRole, Lab, Room, RoomType } from 'src/app/payload/config';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly http:HttpClient) { }

  // Department
  saveDepartment(dept:Department):Observable<any>{
    if(!dept.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/department`,dept);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/department`,dept);
  }
  loadDepartment():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/department/list`);
  }
  deleteDepartment(departmentId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/department/${departmentId}`)
  }

  // Job Role
  savejobRole(jobRole: JobRole):Observable<any>{
    if(!jobRole.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/job-role`,jobRole);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/job-role`,jobRole);
  }
  loadJobRoles():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/job-role/list`);
  }
  deleteJobRole(jobRoleId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/job-role/${jobRoleId}`)
  }

  // Lab
  saveLab(lab: Lab):Observable<any>{
    if(!lab.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/lab`,lab);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/lab`,lab);
  }
  loadLab():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/lab/list`);
  }
  deleteLab(labId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/job-role/${labId}`)
  }

  // Room Type
  saveRoomType(roomType: RoomType):Observable<any>{
    if(!roomType.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/room-type`,roomType);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/room-type`,roomType);
  }
  loadRoomType():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/room-type/list`);
  }
  deleteRoomType(roomTypeId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/room-type/${roomTypeId}`)
  }

  // Room
  saveRoom(room: Room):Observable<any>{
    if(!room.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/room`,room);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/room`,room);
  }
  loadRoom():Observable<any>{
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/room/list`);
  }
  deleteRoom(roomId:string):Observable<any>{
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/room-type/${roomId}`)
  }
}
