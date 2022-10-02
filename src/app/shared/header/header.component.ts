import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AssignDr } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
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
  constructor(
    private storageService: StorageService,
    private patientService:PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.loadAssignedPatient();
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
