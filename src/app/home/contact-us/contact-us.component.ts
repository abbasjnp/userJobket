import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthServices } from './../../core/auth/auth.service';
import { CommonService } from './../../shared/services/common.service';
import { HomeService } from './../home.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public lat: Number =  28.525310;
  public lng: Number = 77.195630;

 /* public origin: any;
  public destination: any;
  public zoom: number = 8;*/

  isLoggedIn: boolean;
  public contactUsForm: FormGroup;
  
   constructor(
    private authService: AuthServices,
    private homeService: HomeService,
    private commonService: CommonService,
    public formBuilder: FormBuilder
    ) { }

  contactUs() {
    const contactDetails = {
      name: this.contactUsForm.value.name,
      email: this.contactUsForm.value.email,
      subject: this.contactUsForm.value.subject,
      message: this.contactUsForm.value.message
    };
    this.homeService.contactUs(
      contactDetails,
      (res:any) => {
         this.commonService.showMessage(res.message);
        this.contactUsForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['',[Validators.required,Validators.email]],
            subject: ['',[Validators.required]],
            message: ['', [Validators.required]]
          });
      },
      err => {
        this.commonService.showError(err.message);
      }
    );
  }

  ngOnInit() {
     this.authService.loggedIn.subscribe(status => {
        this.isLoggedIn = status;
      });
      this.contactUsForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['',[Validators.required,Validators.email]],
            subject: ['',[Validators.required]],
            message: ['', [Validators.required]]
      });
  }

}
