import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../job-detail/job-detail.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomeService } from '../../home.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../account/account.service';
import { CommonService } from '../../../shared/services/common.service';
import { ApplyjobService } from './../applyjob.service';
import { AdditionalInformationComponent } from './../../apply-job/additional-information/additional-information.component';
import { debug } from 'util';

export interface model {
  first_name: null,
  last_name: null,
  email: null,
  mobile: null
}

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {

  validReferral: boolean;
  applyJobForm: FormGroup;
  formData;
  jobId;
  submitted = false;
  resumes;
  btnJ2: boolean;
  mobile: null;
  applyJobid;
  jobrefferal;
  job_payload;
  continueform;
  referredCode;
  public profile_document: any = {
    file: '',
    url: '',
    name: '',
    size: 0
  };
  public profile_pic: any = {
    file: '',
    url: 'assets/img/ot1.jpg'
  };
  constructor(public dialogRef: MatDialogRef<ApplyJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    public commonService: CommonService,
    public accountService: AccountService,
    public dialog: MatDialog,
    private applyjobservice: ApplyjobService
  ) {
    this.jobId = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.continueform = this.applyjobservice.getApplyFormData();
    this.applyJobForm = this.formBuilder.group({
      first_name: [this.continueform.first_name, Validators.required],
      last_name: [this.continueform.last_name, Validators.required],
      email: [{ value: this.continueform.email, disabled: true }, [Validators.required, Validators.email]],
      mobile: [this.continueform.mobile, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      referCode: []
    });
    this.applyJobid = localStorage.getItem('jobId');
    this.jobrefferal = localStorage.getItem('jobReferral');
    // console.log(this.jobrefferal, "apply job refferal");

    if (this.jobrefferal == 'undefined') {
      this.jobrefferal = '';
      // console.log(this.jobrefferal, "blank refferal");
      this.referredCode = this.jobrefferal;
      if (this.continueform.referral_code)
        this.referredCode = this.continueform.referral_code;
    }
    else {
      this.referredCode = this.jobrefferal;
      console.log(this.jobrefferal, "refferal");
     
    }
    this.getApplyJObData();
  }
  get first_name() { return this.applyJobForm.get('first_name'); }
  get last_name() { return this.applyJobForm.get('last_name'); }
  get mobiles() { return this.applyJobForm.get('mobile'); }

  save(form: any): boolean {
    this.continueform.first_name = form.first_name;
    this.continueform.last_name = form.last_name;
    this.continueform.mobile = form.mobile;
    this.continueform.referral_code = form.referCode;
    console.log(this.continueform, "continue form!!");
    this.applyjobservice.setApplyFormData(this.continueform);
    return true;
  }

  setValuesInForm() {
    this.applyJobForm.setValue({
      first_name: this.formData.first_name,
      last_name: this.formData.last_name,
      email: this.formData.email,
      mobile: this.mobile,
      referCode: this.referredCode
    })
  }

  get formControls() { return this.applyJobForm.controls; }

  handleFileInput(event: any, type) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const uploadedfile = event.target.files[0];

      let formData = new FormData();
      formData.append('resume', uploadedfile);
      this.homeService.uploadResumeFile(
        formData,
        res => {
          if (res.success == true) {
            this.resumes = res.resume;
            this.commonService.showMessage('Resume Uploaded SuccessFully.');
          }
        },
        err => {
          this.commonService.showError(err.message);
        }
      );
    }
  }

  getApplyJObData() {
    this.homeService.getApplyJObData(
      (res: any) => {
        if (res.success == true) {
          this.formData = res.data;
          console.log(this.formData, "form Data");
          this.mobile = res.data.mobile;
          if (this.mobile == 'None') {
            this.mobile = null;
          } else {
            this.mobile;
          }
          this.resumes = res.data.resume;
          this.setValuesInForm();
        }
      },
      err => {
        this.commonService.showError(err.message);
      }
    )
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  continueNextlevel() {
    //----------------Firstly Check user is LoggedIn or Not
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
      let currentUrl = '/job-detail/' + this.jobId;
      localStorage.setItem('redirectUrl', currentUrl);
      this.accountService.openLoginDialog();
    }

    //---------------------------------------------------------------------------------------


    if (this.applyJobForm.value.mobile == '') {
      this.commonService.showError("Please Enter Atleast 10 Digit Mobile Number");
    }

    if (this.applyJobForm.value.last_name == '') {
      this.commonService.showError("Please Enter Last Name");
    }
    if (this.applyJobForm.value.first_name == '') {
      this.commonService.showError("Please Enter First Name");
    }
    if (this.resumes == '') {
      this.commonService.showError("Please Upload Resume");
      return;
    }
    let myRefferalCode = localStorage.getItem('my_referral_code');
    if (this.applyJobForm.value.referCode == myRefferalCode) {
      this.commonService.showError("You can't apply with your refferal code");
      this.validReferral = true;
      return;
    }
    this.submitted = true;
    if (this.applyJobForm.invalid) {
      return;
    }

    //-----------------Check to validate the referral code ------------
    console.log(this.applyJobForm.value.referCode, "llllllllllll")
    this.homeService.checkReferralCode(
      { "referral_code": this.applyJobForm.value.referCode },
      res => {
        console.log(res.success, "ref res");
        if (!res.success) {
          this.commonService.showError(res.message);
          this.validReferral = true;
          return;
        }
        else {
          if (this.save(this.applyJobForm.value)) {
            this.openNextDialog();
          }
        }
      },
      err => { }
    )
    //------------------------------------------------------------------

  }
  toValidateReferCode() {     // function for eliminating the red border 
    this.validReferral = false;

  }

  openNextDialog() {
    const dialogRef = this.dialog.open(AdditionalInformationComponent, {
      width: '600px',
      height: '430px',
      data: { id: this.jobId }
    });
    dialogRef.afterClosed().subscribe(result => {
      let formDataValues = this.applyjobservice.getFormData();
      console.log(formDataValues.referral_code, "form referal code")
      formDataValues.referral_code = '';
      console.log(formDataValues.referral_code, "after form referal code")

    });
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
