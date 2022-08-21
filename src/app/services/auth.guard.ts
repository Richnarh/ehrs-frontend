import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppSessionService } from 'src/app/auth/services/app-session.service';
import { contains } from 'underscore';
import { RouteNames } from '../utils/app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appSession: AppSessionService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(route.url.length == 0)
      {
        return true;
      }

      const routeName = route.url[0].path;
      const ignore = contains([RouteNames.Login, RouteNames.ResetPassword], routeName);
  
      if (routeName == RouteNames.Login) {
        if (this.appSession.isLoggedIn()) {
          this.router.navigate([RouteNames.Home]);
          return false;
        } else {
          return true;
        }
      }
  
      if (ignore) { return true }

      
      if(this.appSession.isLoggedIn())
      {
        this.router.navigate([RouteNames.Home]);
        return true;
      }
      else{
        this.router.navigate(['/auth/login']);
      }

    return false;
  }
  
}
