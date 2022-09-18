import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { RouteNames } from 'src/app/utils/app-routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.storageService.clearToken();
    this.router.navigate([RouteNames.Login]);
  }
}
