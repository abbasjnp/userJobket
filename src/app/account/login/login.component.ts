import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthServices } from './../../core/auth/auth.service';
import { CommonService } from './../../shared/services/common.service';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService, SocialUser, LinkedInLoginProvider } from 'angularx-social-login';
import { AccountService } from './../../account/account.service';
import { CheckemailDialogComponent } from './checkemail-dialog/checkemail-dialog.component';
import { SignupdoneDialogComponent } from './../signupdone-dialog/signupdone-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { OtherService } from '../other.service';
import { ApplyJobComponent } from './../../home/apply-job/job/apply-job.component';
import { ReferNowComponent } from './../../home/refer-now/refer-now.component'
// import {OtherService} from './../other.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  socialData;
  getJobId;
  currentURL;
  mobileview: boolean = false;
  mobileview1: boolean = true;
  resMessage;
  jobData;
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    public dialogRefs: MatDialogRef<ReferNowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthServices,
    public socialAuthService: AuthService,
    public commonService: CommonService,
    private toastr: ToastrService,
    private otherService: OtherService
  ) {
    this.currentURL = window.location.href;
    console.log(data, "login Data");
    this.getJobId = data.data;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
      password: ['', Validators.required]
      // email: [''],
      // password: ['']
    });
    //When user logins from the scrolled pop-up from job-detail page
    if (data.value == 'facebook' || data.value == 'google') {
      this.socialSignIn(data.value);
      this.dialogRef.close();
    }

  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password') }

  forgotPwd() {
    this.dialogRef.close();
    this.router.navigate(['account/forgot-password'])
  }
  log() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changeDialog(change: string) {
    if (change == 'applyjob') {
      this.openSignUpDialog(change);
      this.dialogRef.close();
    }
    if (change == 'openLogin') {
      this.openLoginDialog();
      this.dialogRef.close();
    }
  }
  public openSignUpDialog(change) {
    this.mobileview1 = true;
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      height: '465px',
      data: { type: 'signUp', type1: change }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    this.dialogRef.close();
  }
  public openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      height: '470px',
      data: { type: 'login', jobData: this.data.jobData }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  loginSignUp(go) {
    if (this.loginForm.invalid) {
      // this.isFormValid = false;
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }
    if (go == 'login') {
      let loginData = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password,
        "fb_id": null,
        "gmail_id": null,
        "linkedin_id": null
      }
  this.login(loginData);
      // this.authService.login(
      //   loginData,
      //   (res: any) => {
      //     if (res.success) {
      //       let reffral_id = localStorage.getItem('jobReferral');
      //       let applyJobid = localStorage.getItem('jobId');
      //       let titles = localStorage.getItem('title');
      //       let CatName = localStorage.getItem('category-name');
      //       let subCatName = localStorage.getItem('sub-category-name');
      //       let location = localStorage.getItem('location');

      //       console.log(CatName,'cat');
      //       console.log(subCatName,'subcat');
      //       console.log(applyJobid,"jobId");

      //       if (titles != null) {
      //         var str = titles;
      //         var dstr = str.replace(/[{()}]/g, ' ');
      //         var str1 = dstr.replace(/\//g, ' ');
      //         titles = str1.replace(/ /g, "-");
      //       }
      //       let url = localStorage.getItem('redirectUrl');
      //       if (url != null && url.includes('/job')) {
      //         if (reffral_id == null && applyJobid == null) {
      //           console.log(CatName,'cat');
      //           console.log(subCatName,'subcat');
      //           console.log(applyJobid,"jobId");
      //           console.log("referral and job has NOT gotten")
      //           if (CatName && subCatName!='undefined')
      //             this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid + '?ref=' + reffral_id]);
      //           else if (CatName)
      //             this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid + '?ref=' + reffral_id]);
      //           // this.router.navigate([url + '/' + applyJobid + '/' + titles + '?ref=' + reffral_id]);
      //           // this.router.navigate(['/home-page']);
      //           this.commonService.showMessage('Login Successfunavigatel');
      //           localStorage.removeItem('redirectUrl');
      //           this.dialogRef.close();
      //           console.log('reffral_id == null && applyJobid == null')
      //         } else {
      //           if (reffral_id == 'undefined') {
      //             console.log(CatName,'cat');
      //           console.log(subCatName,'subcat');
      //           console.log(applyJobid,"jobId");
      //             if (CatName && subCatName!='undefined')
      //               this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid]);

      //             else if (CatName)
      //               this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid]);

      //             // this.router.navigate(['/job-detail/' + applyJobid + '/' + titles]);
      //             this.commonService.showMessage('Login Successful');
      //             localStorage.removeItem('redirectUrl');
      //             this.dialogRef.close();
      //             if (this.data.value != 'header') {
      //               if (this.data.jobData == undefined)
      //                 this.applyDialog(applyJobid)
      //               else
      //                 this.referDialog(this.data.jobData);
      //             }
      //             console.log('reffral_id == null')
      //           } else {
      //             console.log(applyJobid, "applyJobId");
      //             console.log(titles, "titles");
      //             console.log(reffral_id, "reffral_id");

      //             if (CatName && subCatName!='null')
      //               this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid], { queryParams: { ref: reffral_id } });

      //             else if (CatName)
      //               this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid], { queryParams: { ref: reffral_id } });
      //             // this.router.navigate([url + '/' + applyJobid + '/' + titles], { queryParams: { ref: reffral_id } });

      //             // console.log(url + '/' + applyJobid + '/' + titles, { queryParams: { ref: reffral_id } })


      //             this.commonService.showMessage('Login Successful');
      //             localStorage.removeItem('redirectUrl');
      //             this.dialogRef.close();
      //             // this.applyDialog(applyJobid);
      //             if (this.data.value != 'header') {
      //               if (this.data.jobData == undefined)
      //                 this.applyDialog(applyJobid)
      //               else
      //                 this.referDialog(this.data.jobData);
      //             }
      //             console.log('ref !=null && applyjobid !=null')
      //           }
      //         }

      //       } else {
      //         this.router.navigate(['/home-page']);
      //         this.commonService.showMessage('Login Successful');
      //         this.dialogRef.close();
      //       }
      //     }
      //     else {
      //       // this.commonService.showError(res.message);
      //       this.resMessage = res.message;
      //     }
      //   },
      //   err => {

      //   }
      // )
    }
    if (go == 'signUp') {
      let signUpData = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password,
        "current_page": this.currentURL
      }

      this.authService.signUp(
        signUpData,
        (res: any) => {
          if (res.success) {
            this.commonService.showMessage(res.message);
            //-----------Open CheckEmailDialog-------------     
            const dialogRef = this.dialog.open(CheckemailDialogComponent, {
              width: '300px',
              height: '455px',
              data: { type: 'login' }
            });
            //-------------------------------------------------
            this.dialogRef.close();
          }
          else {
            this.resMessage = res.message;

          }
        },
        err => { }
      )
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  login(data){
    this.authService.login(
      data,
      (res: any) => {
        if (res.success) {
          let reffral_id = localStorage.getItem('jobReferral');
          let applyJobid = localStorage.getItem('jobId');
          let url = localStorage.getItem('redirectUrl');
          let titles = localStorage.getItem('title');
          let CatName = localStorage.getItem('category-name');
          let subCatName = localStorage.getItem('sub-category-name');
          let location = localStorage.getItem('location');
          if (titles != null) {
            var str = titles;
            var dstr = str.replace(/[{()}]/g, ' ');
            var str1 = dstr.replace(/\//g, ' ');
            titles = str1.replace(/ /g, "-");
          }
          if (url != null && url.includes('/job')) {
            if (reffral_id == null && applyJobid == null) {
              // console.log("reffral_id == null && applyJobid == null");
              if (CatName && subCatName)
                this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid + '?ref=' + reffral_id]);
              else if (CatName)
                this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid + '?ref=' + reffral_id]);
              // this.router.navigate([url + '/' + applyJobid + '/' + reffral_id + '/' + titles]);
              this.router.navigate(['/home-page']);
              this.commonService.showMessage('Login Successful');
              localStorage.removeItem('redirectUrl');
              this.dialogRef.close();

            } else {
              if (reffral_id == 'undefined') {
                console.log("referel id ==null")
                if (CatName && subCatName)
                  this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid]);

                else if (CatName)
                  this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid]);

                // this.router.navigate(['/job-detail/' + applyJobid + '/' + titles])
                this.commonService.showMessage('Login Successful');
                localStorage.removeItem('redirectUrl');
                this.dialogRef.close();
             

              } else {
                // console.log("reffral_id != 'null'")
                // this.router.navigate(['/job-detail/' + applyJobid+'/'+reffral_id+'/'+ titles])
                if (CatName && subCatName)
                  this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid], { queryParams: { ref: reffral_id } });

                else if (CatName)
                  this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid], { queryParams: { ref: reffral_id } });
                // this.router.navigate([url + '/' + applyJobid + '/' + titles], { queryParams: { ref: reffral_id } });
                this.commonService.showMessage('Login Successful');
                localStorage.removeItem('redirectUrl');
                this.dialogRef.close();


              }
            }
          } else {
            this.router.navigate(['/home-page']);
            this.commonService.showMessage('Login Successful');
            this.dialogRef.close();
          }
          // this.otherService.FirstTimeUser();
          this.FirstTimeUserReferApplyPopUp(applyJobid)
        }
        else {
          this.commonService.showError(res.message);
        }
      },
      err => {
        this.commonService.showError(err);
      }
    );
  }

  public socialSignIn(socialPlatform: string, isSignUp?) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    console.log(socialPlatformProvider);
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        if (userData) {
          if (socialPlatform == "facebook") {
            //------------ Check for the registered email for FB login ---------------
            if (userData.email == undefined) {
              console.log(userData.id, "idddddddddddddddddd");
              this.otherService.sendFbId(
                { "fb_id": userData.id },
                res => {
                  console.log(res);
                  if (!res.success) {
                    this.checkEmailAddress(userData);
                  }
                  else {
                    this.socialData =
                      {
                        "password": null,
                        "fb_id": userData.id,
                        "gmail_id": null,
                        "linkedin_id": null,
                        "first_name": userData.firstName,
                        "last_name": userData.lastName
                      }
                    // this.socialLogIn(this.socialData);
                    this.login(this.socialData);
                  }
                },
                err => { }
              )
              return;
            }
            else {
              console.log("facebook without moble")
              this.socialData =
                {
                  "email": userData.email,
                  "password": null,
                  "fb_id": userData.id,
                  "gmail_id": null,
                  "linkedin_id": null,
                  "first_name": userData.firstName,
                  "last_name": userData.lastName
                }
              // this.socialLogIn(this.socialData);
              this.login(this.socialData);
            }
          }
          else if (socialPlatform == "google") {
            this.socialData =
              {
                "email": userData.email,
                "password": null,
                "fb_id": null,
                "gmail_id": userData.id,
                "linkedin_id": null,
                "first_name": userData.firstName,
                "last_name": userData.lastName
              }
              this.login(this.socialData);
            // this.socialLogIn(this.socialData, isSignUp);
          }
        }
      }
    );
  }
  checkEmailAddress(userData, isSignUp?) {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(CheckemailDialogComponent, {
      width: '600px',
      height: '430px',
      data: { type: 'signup-emailCheck' }
    });

    dialogRef.afterClosed().subscribe(result => {
      userData.email = result;

      if (userData.email) {
        this.socialData =
          {
            "email": userData.email,
            "password": null,
            "fb_id": userData.id,
            "gmail_id": null,
            "linkedin_id": null,
            "first_name": userData.firstName,
            // "middle_name": userData.middleName,
            "last_name": userData.lastName
          }
          this.login(this.socialData);
        // this.socialLogIn(this.socialData);
      }
    });
  }
  // socialLogIn(userData, isSignUp?, isCheckEmail?) {
  //        this.login(this.socialData);
  //   // this.authService.login(
  //   //   this.socialData,
  //   //   (res: any) => {
  //   //     if (res.success) {
  //   //       let reffral_id = localStorage.getItem('jobReferral');
  //   //       let applyJobid = localStorage.getItem('jobId');
  //   //       let url = localStorage.getItem('redirectUrl');
  //   //       let titles = localStorage.getItem('title');
  //   //       let CatName = localStorage.getItem('category-name');
  //   //       let subCatName = localStorage.getItem('sub-category-name');
  //   //       let location = localStorage.getItem('location');
  //   //       if (titles != null) {
  //   //         var str = titles;
  //   //         var dstr = str.replace(/[{()}]/g, ' ');
  //   //         var str1 = dstr.replace(/\//g, ' ');
  //   //         titles = str1.replace(/ /g, "-");
  //   //       }
  //   //       if (url != null && url.includes('/job')) {
  //   //         if (reffral_id == null && applyJobid == null) {
  //   //           // console.log("reffral_id == null && applyJobid == null");
  //   //           if (CatName && subCatName)
  //   //             this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid + '?ref=' + reffral_id]);
  //   //           else if (CatName)
  //   //             this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid + '?ref=' + reffral_id]);
  //   //           // this.router.navigate([url + '/' + applyJobid + '/' + reffral_id + '/' + titles]);
  //   //           this.router.navigate(['/home-page']);
  //   //           this.commonService.showMessage('Login Successful');
  //   //           localStorage.removeItem('redirectUrl');
  //   //           this.dialogRef.close();

  //   //         } else {
  //   //           if (reffral_id == 'undefined') {
  //   //             console.log("referel id ==null")
  //   //             if (CatName && subCatName)
  //   //               this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid]);

  //   //             else if (CatName)
  //   //               this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid]);

  //   //             // this.router.navigate(['/job-detail/' + applyJobid + '/' + titles])
  //   //             this.commonService.showMessage('Login Successful');
  //   //             localStorage.removeItem('redirectUrl');
  //   //             this.dialogRef.close();
  //   //             console.log(isCheckEmail, "ischeckemail");

  //   //           } else {
  //   //             // console.log("reffral_id != 'null'")
  //   //             // this.router.navigate(['/job-detail/' + applyJobid+'/'+reffral_id+'/'+ titles])
  //   //             if (CatName && subCatName)
  //   //               this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid], { queryParams: { ref: reffral_id } });

  //   //             else if (CatName)
  //   //               this.router.navigate(['/' + CatName + '-jobs' + '/' + titles + '/' + location + '/' + applyJobid], { queryParams: { ref: reffral_id } });
  //   //             // this.router.navigate([url + '/' + applyJobid + '/' + titles], { queryParams: { ref: reffral_id } });
  //   //             this.commonService.showMessage('Login Successful');
  //   //             localStorage.removeItem('redirectUrl');
  //   //             this.dialogRef.close();


  //   //           }
  //   //         }
  //   //       } else {
  //   //         this.router.navigate(['/home-page']);
  //   //         this.commonService.showMessage('Login Successful');
  //   //         this.dialogRef.close();


  //   //       }
  //   //       // this.otherService.FirstTimeUser();
  //   //       this.FirstTimeUserReferApplyPopUp(applyJobid, isCheckEmail)


  //   //     }
  //   //     else {
  //   //       this.commonService.showError(res.message);
  //   //     }
  //   //   },
  //   //   err => {
  //   //     this.commonService.showError(err);
  //   //   }
  //   // );
  // }
  FirstTimeUserReferApplyPopUp(applyJobid) {
  // FirstTimeUserReferApplyPopUp(applyJobid, isCheckEmail) {
    console.log(this.data.value, "headerrrrrrrrrrrrrrrrr");
    this.authService.FirstTimeUser(
      res => {
        console.log(this.data.jobData, "jobData");
        console.log(applyJobid, "apply Job Id");

        if (res.preference == false) {
          console.log(res.preference, "res preference");
          this.otherService.signupDone();
        }
        else if (res.preference == true && this.data.value != 'header') {
          console.log(res.preference, "res preference.....");
          if (this.data.jobData != undefined) {
            this.otherService.referDialog(this.data.jobData);
          }
          else if (this.data.jobData == undefined && applyJobid != null) {
            this.otherService.applyDialog(applyJobid);
            console.log(applyJobid, "applyJobId");
            console.log(this.data.jobData, "jobData");
            console.log(res.preference, "res preference apply Job");
          }
        }
      },
      err => {
      }
    )  
  }
  getJobDataForLinkDin(signUp?) {
    console.log("linkkkkkkkkkkkkkkkkkkkkkkkkkkkkedin");
    console.log(this.data.jobData)
    localStorage.setItem('jobData', JSON.stringify(this.data.jobData));
    localStorage.setItem('header', this.data.type);
    if (signUp) {
      localStorage.setItem('signUp', 'isSignUp');

    }
  }

  applyDialog(jobID) {
    const dialogRef = this.dialog.open(ApplyJobComponent, {
      width: '600px',
      height: '430px',
      data: { id: jobID }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  referDialog(jobData) {
    console.log(jobData, "jobDataaaaaaaaaaaa");
    const dialogRef = this.dialog.open(ReferNowComponent, {
      width: '600px',
      height: '480px',
      data: { data: jobData }
    });
    let currentUrl = '/job-detail/' + jobData.job_id;
    localStorage.setItem('redirectUrl', currentUrl);
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem('currentUrl');

    });
  }

  mobilesignup() {
    this.mobileview = true;
    this.mobileview1 = false;
  }
  // tos() {
  //   this.router.navigate(['/terms-conditions']);
  //   this.dialogRef.close();
  // }
  // pop() {
  //   this.router.navigate(['/privacy-policy']);
  //   this.dialogRef.close();
  // }
  eraseMessage() {
    this.resMessage = '';
  }
}
