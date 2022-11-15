import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AssignDr } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { AppModules } from 'src/app/services/modules';
import { StorageService } from 'src/app/services/storage.service';
import { RouteNames } from 'src/app/utils/app-routes';
import { LocalKeys } from '../../utils/LocalKeys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  assignDrList:AssignDr[];
  doctorId:string;

  pages:any;
  search:string;searchb:boolean;

  constructor(
    private storageService: StorageService,
    private patientService:PatientService,
    private router: Router,
    private eventProxyService: EventProxyService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getParams();
    this.loadAssignedPatient();

    const result = await firstValueFrom(this.eventProxyService.loadPages(AppModules.OTHERS));
    this.pages = result.data[0]["userPageData"];
    for(let i of this.pages){

      if(i.pageName === 'Patient Search'){
        this.search = i.pageName;
        this.searchb = i.userActivePage;
      }
    }
  }

  getParams(){
    this.doctorId = JSON.parse(this.storageService.getLocalObject(LocalKeys.CurrenUserId)!);
  }

  async loadAssignedPatient(){
    const result = await firstValueFrom(this.patientService.loadPatientAssignedToDr(this.doctorId));
    this.assignDrList = result.data;
  }


  logout(){
    this.storageService.clearToken();
    this.router.navigate([RouteNames.Login]);
  }
}
