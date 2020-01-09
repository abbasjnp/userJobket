import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from './../../shared/services/common.service';
import { AccountService } from './../account.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
   public resetPwdForm: FormGroup;
   key:string;
  constructor(private commonService: CommonService,
  	          private accountService: AccountService,
  	          private formBuilder: FormBuilder,
  	          private route: ActivatedRoute,
  	          private router: Router) { }

  ngOnInit() {
  	this.resetPwdForm = this.formBuilder.group(
      {
        pwd: ['', [Validators.required]],
       cpwd: ['', [Validators.required]]
      }
      );
    this.key = this.route.snapshot.queryParamMap.get("key")
  }

   resetPwd() {
  	this.key = this.route.snapshot.queryParamMap.get("key")
    let pwd = this.resetPwdForm.value.pwd;
    let cpwd = this.resetPwdForm.value.cpwd;
    if(pwd === cpwd){

    this.accountService.resetPassword(
      {
      	key: this.key,
        password: this.resetPwdForm.value.pwd
      },
      res => {
        if (res.success) {
          this.commonService.showMessage(res.message);
          this.router.navigate(['']);
          //this._commonService.gotoPage('/account/login');
        }
      },
      err => {
        this.commonService.showError(err);
      }
    );
   }
   else{
   	  this.commonService.showError("Password and confirm Password are not matched");
   }
  }

}
