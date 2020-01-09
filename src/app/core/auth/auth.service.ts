import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {environment} from './../../../environments/environment';
import { DataService } from '../http/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  authUrl = environment.baseUrl+'user/';
  emailVerifyUrl = environment.baseUrl+'authentication/';
  resumeStrength;
  
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}
  public strength =new BehaviorSubject<any>(this.resumeStrength);
  public user = new BehaviorSubject<any>(null);
  public openDialog = new BehaviorSubject<boolean>(true);
  public jobData = new BehaviorSubject<any>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  
  get isStregth() {
    return this.strength.asObservable(); // {2}
  }

  get isJobData(){
    return this.jobData.asObservable();
}

  constructor(private dataService:DataService,private router: Router,) { 
    this.reload();
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
    this.removeUser();
    this.strength.next(this.resumeStrength=0);
  }

  public login(user, successCall, errorCall) {
    this.dataService.post(this.authUrl + 'login/', user).subscribe(
      (res: any) => {
        if (res.success) {
          this.loggedIn.next(true);
          this.resumeStrength =res.user_info.resume_strength;
          this.strength.next(this.resumeStrength);
          this.setUser(res);
            successCall(res);
        } else {
          this.loggedIn.next(false);
           successCall(res)
        }
      },
      err => {
        this.loggedIn.next(false);
        errorCall(err);
      }
    );
  }

  setUser(res) {
    this.user.next({
      first_name: res.user_info.first_name,
      middle_name: res.user_info.middle_name,
      last_name: res.user_info.last_name,
      email: res.user_info.email,
      myprofile_status: res.user_info.myprofile_status,
      my_referral_code: res.user_info.my_referral_code,
      resume_strength: res.user_info.resume_strength
    });

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('my_referral_code', res.user_info.my_referral_code);
    localStorage.setItem('token', JSON.stringify(res.token));
    localStorage.setItem('userInfo', JSON.stringify(res.user_info));
    localStorage.setItem('first_name', res.user_info.first_name);
    localStorage.setItem('middle_name', res.user_info.middle_name);
    localStorage.setItem('last_name', res.user_info.last_name);
    localStorage.setItem('email', res.user_info.email);
    localStorage.setItem('myprofile_status', res.user_info.myprofile_status);
    localStorage.setItem('resume_strength',res.user_info.resume_strength);
    // localStorage.setItem('Strength',res.user_info.resume_strength);
  }
  removeUser() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('first_name');
    localStorage.removeItem('middle_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('email');
    localStorage.removeItem('myprofile_status');
    localStorage.removeItem('my_referral_code');
    localStorage.removeItem('linkedIntoken');
    localStorage.removeItem('resume_strength');
    localStorage.removeItem('jobId');
    localStorage.removeItem('jobReferral');
    // localStorage.removeItem('Strength');
  }
  reload() {
     
    let loggedIn = null;
    let token = null;
    let userInfo = null;
    let first_name = null;
    let middle_name = null;
    let last_name = null;
    let email = null;
    let myprofile_status = null;
    let resume_strength =null;

    if (localStorage.getItem('loggedIn')) {
      loggedIn = localStorage.getItem('loggedIn');
    }
    if (localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token'));
    }
    if (localStorage.getItem('userInfo')) {
      userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    if (localStorage.getItem('first_name')) {
      first_name = localStorage.getItem('first_name');
    }
    if (localStorage.getItem('middle_name')) {
      middle_name = localStorage.getItem('middle_name');
    }
    if (localStorage.getItem('last_name')) {
      last_name = localStorage.getItem('last_name');
    }
    if (localStorage.getItem('email')) {
      email = localStorage.getItem('email');
    }
    if (localStorage.getItem('myprofile_status')) {
      myprofile_status = localStorage.getItem('myprofile_status');
    }
    if (localStorage.getItem('resume_strength')) {
      resume_strength = localStorage.getItem('resume_strength');
      this.strength.next(resume_strength);
    }

    // let nav = this.router.getCurrentNavigation();

    // if (loggedIn && token && token.access_token) {
    //   this.loggedIn.next(true);
    //   this.user.next({
    //     first_name: first_name,
    //     middle_name: middle_name,
    //     last_name: last_name,
    //     email: email,
    //     myprofile_status: myprofile_status
    //   });
    //   // if(!this.router.url.includes('job'))
    //   // this.router.navigate(['/user/home-page']);
    // } else if (nav.finalUrl.queryParams && nav.finalUrl.queryParams.key) {
    //   this.router.navigate(['/authentication/email-verification']);
    //   this.removeUser();
    // } else {
    //   // if(!this.router.url.includes('job'))
    //   // this.router.navigate(['/home-page']);
    // }
  }
  public getToken() {
    const tokenObj = JSON.parse(localStorage.getItem('token'));
    return tokenObj.token_type + ' ' + tokenObj.access_token;
  }

  public signUp(user, successCall, errorCall) {
    this.dataService.post(this.authUrl + 'registration/', user).subscribe(
      (res: any) => {
        if (res.success) {
            // this.setUser(res);
            successCall(res);
        } else {
          this.loggedIn.next(false);
           successCall(res)
        }
      },
      err => {
        this.loggedIn.next(false);
        errorCall(err);
      }
    );
  }
  public FirstTimeUser(successCall,errorCall){
    this.dataService.get(this.authUrl+'user-preference/').subscribe(
      (res:any)=>{
        successCall(res);
      },
      err=>{
        errorCall(err);
      }
    )
  }
  public FirstTimeUserPreference():boolean{
    let preference;
    this.dataService.get(this.authUrl+'user-preference/').subscribe(
      (res:any)=>{
        console.log(res.preference,"res preferences")
        preference = res.preference;
      },
      err=>{
      
      }
    )
    console.log(preference,"pre");
    return preference;
  }

 


}