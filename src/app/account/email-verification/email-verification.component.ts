import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServices } from './../../core/auth/auth.service';
import { CommonService } from './../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const DOGS_KEY = makeStateKey('dogs');
import {environment} from './../../../environments/environment';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AccountService} from './../account.service'
import { OtherService } from '../other.service';
import { SignupdoneDialogComponent } from '../signupdone-dialog/signupdone-dialog.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  dogs: any;
  public key;
  public href: string = "";
  routes: string;
  flag;
  baserUrl= environment.baseUrl;
  jobId;
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthServices,
    private router: Router,
    private activatedRout: ActivatedRoute,
    private commonService: CommonService,
    private http: HttpClient,
    private location:Location,
    private state: TransferState,
    private otherService:OtherService,
    private accountService:AccountService) { }

  ngOnInit() {
    this.key = this.route.snapshot.queryParamMap.get('key');

    this.emailVerify(this.key);
    this.dogs = this.state.get(DOGS_KEY, null as any);
  }
  emailVerify(key) {
    const request = {
      "key": key
    }
    if (!this.dogs) {
      this.http
        .post(this.baserUrl +'authentication/'+'email-verification/',request)
        .subscribe((data:any) => {
          //  console.log(data,"data");
           if(data.success){
            this.authService.loggedIn.next(true);
            this.authService.resumeStrength =data.user_info.resume_strength;
            this.authService.strength.next(this.authService.resumeStrength);
            this.authService.setUser(data);
            this.state.set(DOGS_KEY, data as any);        
            //this.router.navigate(['/home-page']);
            console.log(data.user_info.current_page,'currrrrr');
            this.router.navigateByUrl(`${data.user_info.current_page}`);
            this.commonService.showMessage('Login Successful');
            this.jobId = this.activatedRout.snapshot.paramMap.get('id');
            console.log(this.jobId,"jobid in ng onit")
            this.otherService.FirstTimeUser();               
           }
           else{
             this.commonService.showMessage(data.message);
            //  console.log(data.message,"Response Message");
           }         
        },
        err=>{
          console.log(err,"error")
        });
    }
  }
 
} 
