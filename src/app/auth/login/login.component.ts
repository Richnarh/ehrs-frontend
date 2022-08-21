import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { firstValueFrom } from 'rxjs';
import { RouteNames } from 'src/app/utils/app-routes';
import { ToastService } from 'src/app/utils/toast-service';
import { AuthRequest } from '../payload/AuthRequest';
import { AppSessionService } from '../services/app-session.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginParams = <AuthRequest>{};
  @BlockUI('loading') loading: NgBlockUI;
  loginForm: FormGroup;

  constructor(private appSession:AppSessionService, private router:Router, private fb:FormBuilder, private toast:ToastService, private authService:AuthService) { }

  ngOnInit(): void {
    this.setupForm();
  }

  async loginSubmit() {
    let payload = this.loginForm.value;
    console.log(payload);
    try {
      this.loading.start("Logging In...");
      if(this.loginForm.invalid){
        this.toast.error('please provide for all fields');
        return;
      }
      const result = await firstValueFrom(await this.authService.doLogin(payload));

      console.log('login response => ',result.data);
      if (!result.success){
        this.toast.error('Login failed');
        return;
      }
      this.appSession.triggerLogin(true);

      this.appSession.registerLogin(result.data);
      this.router.navigate([RouteNames.Home]);

    } catch (error) {
      console.log(error);
     } finally { 
       this.loading.stop(); 
      }
  }

  private setupForm() {
    this.loginForm = this.fb.group({
      emailAddress: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  emailValidator(){
    const emailAddress = this.loginForm.controls["emailAddress"];
    if(emailAddress.touched && !emailAddress.valid && emailAddress.dirty){
      if(emailAddress.errors?.['required']){
        return "Email is required";
      }
    }
    if(emailAddress.errors?.['pattern']){
      return "Please enter a valid email";
    }
    return null;
  }

  passwordValidator(){
    const password = this.loginForm.controls["password"];
    if(password.touched && !password.valid && password.dirty){
      if(password.errors?.['required']){
        return "Password is required";
      }
    }
    return null;
  }
}
