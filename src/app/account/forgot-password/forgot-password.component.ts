import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from './../../shared/services/common.service';
import { AccountService } from './../account.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPwdForm:FormGroup;
  constructor(private formBuilder: FormBuilder, 
  	          private commonService: CommonService,
  	          private accountService: AccountService,
  	          private route: Router) { }

  ngOnInit() {
  	 this.forgetPwdForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }

  forgotPwd(){
  	let email = {
  		email:this.forgetPwdForm.value.email
  	}
  	this.accountService.forgotPassword(
        email,
        res =>{
        	if (res.success) {
                 this.commonService.showMessage(res.message);
                 this.route.navigate(['']);
            }
        },
        err =>{
        	this.commonService.showError(err);
        }
  	)
  }

}
