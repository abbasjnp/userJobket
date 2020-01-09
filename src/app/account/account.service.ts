import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { DataService } from './../core/http/data.service';
import { environment } from './../../environments/environment';
import { AuthServices } from '../core/index.core';
import {HttpModule} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  authUrl = environment.baseUrl + 'authentication/';
  userUrl = environment.baseUrl+'user/';

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private auth: AuthServices) { }

  public openLoginDialog(value?) {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      height: '470px',
      data: { type: 'login', value: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      //  this.auth.jobData.next(null);
       console.log("unsubscrible");
    });
  }
  public openSignUpDialog(chkrefer,jobData?) {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      height:'465px',
      data: {type:'signUp',type1:chkrefer,jobData:jobData}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.auth.jobData.next(null);
      // console.log("unsubscrible");
      
      this.auth.openDialog.next(false);          //Closing the popUp on scroll

    });
  }
  public forgotPassword(user, successCall, errorCall) {
    this.dataService.post(this.authUrl + 'forget-password/', user).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        } else {
          errorCall(res.message);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }
  public sendEmail(email,successCall,errorCall) {
    console.log(email,"service");
   
    console.log(this.userUrl + 'check-email-social-sign-up/',"urllllll");
    // return this.http.post(this.userUrl + 'check-email-social-sign-up/',email);

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
  //reset password function added by upendra
  public resetPassword(user, successCall, errorCall) {
    this.dataService.post(this.authUrl + 'reset-password/', user).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
          // console.log("res", res);
        } else {
          errorCall(res.message);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }
  public submitPreferredData(data, successCall, errorCall) {
    this.dataService.post(this.userUrl + 'user-preference/', data).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
          
        } else {
          errorCall(res.message);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }


 
}

