import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { AuthServices } from '../../core/index.core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OtherService } from '../other.service';
import { ApplyJobComponent } from './../../home/apply-job/job/apply-job.component';
import { ReferNowComponent } from './../../home/refer-now/refer-now.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-linkdin-login',
  templateUrl: './linkdin-login.component.html',
  styleUrls: ['./linkdin-login.component.scss']
})
export class LinkdinLoginComponent implements OnInit {
  code: any;
  token: string;
  res;
  expToken;
  handle;
  jobData;
  public isError = <boolean>false;
  emailLinkdin
  linkdinData = {
    "email": '',
    "password": 'null',
    "fb_id": null,
    "gmail_id": null,
    "linkedin_id": '',
    "first_name": '',
    "last_name": ''
  }
  constructor(
    private router: Router,
    private commonService: CommonService,
    private _authService: AuthServices,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private otherService: OtherService,
    private authService: AuthServices,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) { }
  ngOnInit() {
    localStorage.setItem('set', 'HelpLinkedIn')
    const httpopt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    this.code = this.route.snapshot.queryParamMap.get('code');
    // console.log(this.code, 'codeeee');
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', this.code);

    body.set('redirect_uri', 'https://jobket.in/account/login/auth/linkedin');
    body.set('client_id', '81p8cjl7pehohx');
    body.set('client_secret', 'H0yyyfDAHu75IaCl');

    // body.set('redirect_uri', 'http://localhost:4200/account/login/auth/linkedin');
    // body.set('client_id', '86o2xpjqz974i0');
    // body.set('client_secret', 'lkxEBgTcGE81QIOU');
    // http://cors-anywhere.herokuapp.com/
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http
      .post('https://cors-anywhere.herokuapp.com/' + 'https://www.linkedin.com/oauth/v2/accessToken', body.toString(), httpopt)
      .subscribe(response => {
        this.res = response;
        console.log(this.res, "get token-------------------");
        this.token = this.res.access_token;
        localStorage.setItem('linkedIntoken', this.token);
        this.expToken = this.res.expires_in;
        if (this.token) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('linkedIntoken')
            })
          }
          this.http.get('https://cors-anywhere.herokuapp.com/' + 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', httpOptions)
            .subscribe((res: any) => {

              this.linkdinData.email = res.elements[0]['handle~'].emailAddress;
              console.log(this.linkdinData.email, "emailllll");
            },
              err => {
                console.log(err, "Second API response error");
              })
          this.http.get('https://cors-anywhere.herokuapp.com/' + 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', httpOptions)
            .subscribe((res: any) => {
              this.linkdinData.first_name = res.firstName.localized.en_US;
              this.linkdinData.last_name = res.lastName.localized.en_US;
              this.linkdinData.linkedin_id = res.id;
              setTimeout(() => {
                this.login();
                localStorage.removeItem('set');    //Remove variable set after login
              }, 2000);
            },
              err => {
                console.log(err, "Third API response error");
              })
        }
      },
        err => {
          console.log(err, "First API response error");
        }
      );
  }
  login() {
    console.log(this.linkdinData,"linkData");
    // localStorage.removeItem('linkedIntoken');
    this._authService.login(
      this.linkdinData,
      (res: any) => {
        if (res.success) {
          // console.log("res success")
          let reffral_id = localStorage.getItem('jobReferral');
          let applyJobid = localStorage.getItem('jobId');
          let url = localStorage.getItem('redirectUrl');
          let titles = localStorage.getItem('title');
          if (titles != null) {
            var str = titles;
            var dstr = str.replace(/[{()}]/g, ' ');
            var str1 = dstr.replace(/\//g, ' ');
            titles = str1.replace(/ /g, "-");
          }
          if (url) {
            if (reffral_id == null && applyJobid == null) {  // It will go to the home page
              this.router.navigate(['/home-page']);
              this.commonService.showMessage('Login Successful');
              localStorage.removeItem('redirectUrl'); 
              // this.otherService.FirstTimeUser();
              console.log(reffral_id,'referral id == null && applyJobid==null');
            }
            else if (reffral_id === 'undefined') {  //Code will be run when copied and paste it in a new window with login
              console.log(reffral_id,'referral id == undefined');
              console.log(applyJobid,"applyJobId");
              this.router.navigate(['/job-detail/' + applyJobid + '/' + titles])
              this.commonService.showMessage('Login Successful');
              localStorage.removeItem('redirectUrl');
            }
            else {
              console.log(applyJobid,"applyJob Id");
              console.log(reffral_id,"refferral Id");
               console.log("referealid!=====null")
              this.router.navigate([url + '/' + applyJobid + '/' + titles], { queryParams: { ref: reffral_id } });
              this.commonService.showMessage('Login Successful');
              // this.otherService.FirstTimeUser();
              localStorage.removeItem('redirectUrl');
            }
          } else {
            console.log(reffral_id,'referral id');
            console.log(applyJobid,"applyJobId");
            console.log(url,"url");
             console.log("/home page");
            this.router.navigate(['/home-page']);
            this.commonService.showMessage('Login Successful');
          }
         this.FirstTimeUserReferApplyPopUp(applyJobid);        
        }
        else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        this.isError = true;
        this.commonService.showError(err);
        this.router.navigate(['account/login']);
      }
    );
  }
  FirstTimeUserReferApplyPopUp(applyJobid){
    let jobData = localStorage.getItem('jobData');
    if (localStorage.getItem('header') != 'header') {
      this.authService.FirstTimeUser(
        res => {
          if (res.preference == false) {
            console.log(res.preference, "res preference");
            this.otherService.signupDone();
          }
          else {
            console.log(res.preference, "res preference.....");
            if (jobData!= 'undefined') {
            this.otherService.referDialog(JSON.parse(jobData));
            console.log(res.preference, "res preference referDialog");
             localStorage.removeItem('jobData');                 
            }
            else if(jobData== 'undefined' && applyJobid!=null) {
              this.otherService.applyDialog(applyJobid);
              console.log(applyJobid,"applyJobId");
              console.log(jobData,"jobData");
            console.log(res.preference, "res preference apply Job");             
            }
          }
        },
        err => {
        }
      )
      localStorage.removeItem('header');     
    }
  }
}
