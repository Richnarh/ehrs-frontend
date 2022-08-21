import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "src/app/utils/toast-service";
import { LocalKeys } from "../utils/LocalKeys";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(
        private router: Router,
        private storage: StorageService, 
        private toastService: ToastService 
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const token = this.storage.getToken();
        let requestClone = req.clone();

        if(token){
            const currentUser = this.storage.getLocalObject(LocalKeys.CurrenUser);

            const user = (currentUser) ? JSON.parse(currentUser) : null;
            requestClone = req.clone({setHeaders: { token: `${JSON.parse(token)}`, role:user?.role, userid:user?.userid, fullname:user?.fullname, contact:user?.contact }
            });
        
            console.log('intercepted Request => ', requestClone);
        }
        
        return next.handle(requestClone).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log('error intercept => ',err.status)
                    if(err.status === HttpStatusCode.Unauthorized)
                    {
                        this.toastService.errorMessage("Unauthorized Access","Error");
                        this.router.navigate(['/auth/login']);
                    }
                    else if(err.status === HttpStatusCode.Forbidden)
                    {
                      this.toastService.errorMessage("Forbidden Access","Error");
                    }
                    return throwError("Unknow error!");
                }
            )
        );
    }
}