import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LookupItem } from 'src/app/payload/lookupItem';
import { LookupService } from 'src/app/services/lookup.service';
import { ToastService } from 'src/app/utils/toast-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  jobRoleList:LookupItem[];
  titleList:LookupItem[];
  signupForm:FormGroup;

  constructor(private router:Router, private authService:AuthService, private toast:ToastService, private lookupService:LookupService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.setupForm();
    this.init();
  }

  async init(){
    const jobRole = await firstValueFrom(this.lookupService.jobRole());
    const title = await firstValueFrom(this.lookupService.title());

    this.jobRoleList = jobRole.data;
    this.titleList = title.data;

    console.log('JobRole: ',this.jobRoleList);
    console.log('Title: ',this.titleList);
  }

  async signup(){
    if(this.signupForm.invalid){
      this.toast.error('please provide for all fields');
      return;
    }

    let formData = this.signupForm.value;
    console.log(formData);
    const result = await firstValueFrom(await this.authService.signup(formData));
    if(result){
      this.toast.info("registration successful, please login");
      this.router.navigate(['/auth/login']);
    }
  }

  setupForm(){
    this.signupForm = this.fb.group({
      emailAddress: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      title: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  emailValidator(){
    const emailAddress = this.signupForm.controls["emailAddress"];
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
    const password = this.signupForm.controls["password"];
    if(password.touched && !password.valid && password.dirty){
      if(password.errors?.['required']){
        return "Password is required";
      }
    }
    return null;
  }

  phoneNumberValidator(){
    const phoneNumber = this.signupForm.controls["phoneNumber"];
    if(phoneNumber.touched && !phoneNumber.valid && phoneNumber.dirty){
      if(phoneNumber.errors?.['required']){
        return "Phone Number is required";
      }
    }
    return null;
  }
  titleValidator(){
    const title = this.signupForm.controls["title"];
    if(title.touched && !title.valid && title.dirty){
      if(title.errors?.['required']){
        return "Title is required";
      }
    }
    return null;
  }
}
