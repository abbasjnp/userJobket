import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommonService } from './../../shared/services/common.service';
import {HomeService} from './../home.service';
import { AuthServices } from './../../core/auth/auth.service';
import {AccountService} from './../../account/account.service';
import { DataService} from './../../core/http/data.service';
import { environment} from './../../../environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private serviceUrl= environment.baseUrl+ 'authentication/';
  changePasswordFrom: FormGroup;
  submitted = false;
  job_payload;

  constructor(private formBuilder: FormBuilder,public commonService: CommonService,private homeService:HomeService,public authService:AuthServices,public accountService:AccountService,
    private dataService: DataService
    ) { }

  ngOnInit() {
     this.changePasswordFrom = this.formBuilder.group({
            old_password: ['', Validators.required],
            new_password: ['', Validators.required],
            confirm_password: ['', Validators.required]
        });
  }

  get formControls() { return this.changePasswordFrom.controls; }

  changePassword(){
    this.submitted = true;
    if (this.changePasswordFrom.invalid) {
      return;
    }

    let oldPassword = this.changePasswordFrom.value.old_password;
    let newPassword = this.changePasswordFrom.value.new_password;
    let confirmPpassword = this.changePasswordFrom.value.confirm_password;

    if (newPassword != confirmPpassword) {
      this.commonService.showError('New Password And Confirm Password are not same');
     return;
    }

      this.job_payload = {
      old_password: this.changePasswordFrom.value.old_password,
      new_password: this.changePasswordFrom.value.new_password,
    }

    
   
    this.homeService.changePassword(
      this.job_payload,
      res => {
        if (res.success) {
          this.changePasswordFrom.reset();
          this.commonService.showMessage(res.message);
          this.authService.logout();
          localStorage.removeItem('Strength');
          this.accountService.openLoginDialog();
        } 
      },
      err => {
        this.commonService.showError(err.message);
      }
    );
  }

  logout() {
    this.dataService.get(this.serviceUrl + 'logout/').subscribe(
        (res: any) => {
            this.commonService.showMessage('You have successfully logged out.');
            this.authService.logout();
        },
        err => {
            this.commonService.showMessage(err.message);
            this.authService.logout();
        }
    );
}
}