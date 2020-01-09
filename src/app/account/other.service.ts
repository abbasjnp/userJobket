import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignupdoneDialogComponent } from './signupdone-dialog/signupdone-dialog.component';
import {AccountService} from './account.service'
// import { AuthService } from 'angularx-social-login';
import {DataService} from './../core/http/data.service';
import { environment } from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { AuthService } from 'angularx-social-login';
import { AuthServices } from '../core/index.core';
import { ReferNowComponent } from '../home/refer-now/refer-now.component';
import {ApplyJobComponent} from './../home/apply-job/job/apply-job.component'
// import { SignupdoneDialogComponent } from './signupdone-dialog/signupdone-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(public dataService:DataService,
              private http:HttpClient,
              private authService:AuthServices,
              public dialog: MatDialog,) { }
  userUrl = environment.baseUrl+'user/';

  public sendEmail(email, successCall, errorCall) {
    console.log(email,"service");
    this.dataService.post(this.userUrl + 'check-email-social-sign-up/', email).subscribe(
      (res: any) => {
        console.log(res,"resemail");
          successCall(res);
      },
      err => {
        console.log(err,"resemail");

        errorCall(err);
      }
    );
  }

  FirstTimeUser(){ 
    this.authService.FirstTimeUser(
      res=>{
        console.log(res,"First time user");  
        if(res.preference==false){
          this.signupDone();    
        }
      
      },
      err=>{}
    )
  }
  signupDone(){
    const dialogRef = this.dialog.open(SignupdoneDialogComponent, {
     width: '380px',
     height: '590px', 
     data: { type: 'signupdone'}   
   });
   dialogRef.afterClosed().subscribe(result => {     
     
   });
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
  console.log(jobData,"jobDataaaaaaaaaaaa");
  const dialogRef = this.dialog.open(ReferNowComponent, {
    width: '600px',
    height: '480px',
    data: { data: jobData}
  });
  localStorage.removeItem('jobData');
  let currentUrl = '/job-detail/' + jobData.job_id;
  localStorage.setItem('redirectUrl', currentUrl);
  dialogRef.afterClosed().subscribe(result => {
  localStorage.removeItem('currentUrl');
 
  });
}
public sendFbId(id, successCall, errorCall) {
 
  this.dataService.post(this.userUrl + 'check-email-popup-social-login/', id).subscribe(
    (res: any) => {
      console.log(res,"resemail");
        successCall(res);
    },
    err => {
      console.log(err,"resemail");

      errorCall(err);
    }
  );
}

//  referDialog(jobData) {
//     console.log(jobData,"jobDataaaaaaaaaaaa");
//     const dialogRef = this.dialog.open(ReferNowComponent, {
//       width: '600px',
//       height: '480px',
//       data: { data: jobData }
//     });
//     let currentUrl = '/job-detail/' + jobData.job_id;
//     localStorage.setItem('redirectUrl', currentUrl);
//     dialogRef.afterClosed().subscribe(result => {
//     localStorage.removeItem('currentUrl');
//     });
//   }



  // public FirstTimeUserDialog() {
  //   const dialogRef = this.dialog.open(SignupdoneDialogComponent, {
  //     width: '380px',
  //     height: '550px',
  //     data: { type: 'signupdone' }
  //   });
  //   // this.dialogRefs.close();
  //   dialogRef.afterClosed().subscribe(result => {
  //         console.log(result,'result');    
  //         // this.getValue(result);
          
  //   });
  //   // dialogRef.close();
  // }
  // getValue(result){
  //   this.dataService.post(this.userUrl + 'user-preference/', result).subscribe(
  //     res=>console.log(res)
  //    )
  // }
  
}
