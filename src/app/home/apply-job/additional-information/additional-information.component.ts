import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../job-detail/job-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApplyJobComponent} from './../job/apply-job.component';
import {HomeService} from './../../home.service';
import {CommonService} from './../../../shared/services/common.service';
import {ApplyjobService} from './../applyjob.service';
import {ApplyJobFormData} from './../applyformdata';
import {JobApplySuccessComponent} from './../job-apply-success/job-apply-success.component'


@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss']
})
export class AdditionalInformationComponent implements OnInit {
  jobId;
  question;
  questions_and_answers:any=[];
  questionForm:FormGroup;
  formData:ApplyJobFormData;
  submitted = false;
  questionData:any;
  jobrefferal;
  job_payload;
  additionalquestion;

  constructor(public homeService:HomeService,public applyjobService:ApplyjobService,public commonService:CommonService, public dialogRef: MatDialogRef<AdditionalInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog:MatDialog,private formBuilder: FormBuilder
    ) {
      this.jobId = homeService.jobId;
      
    }

  ngOnInit() {
    this.applyJobGetquestion();
    this.getAdditionalQuestion();

    this.questionData = this.applyjobService.getQuestionFormData();
    // this.questionData.experience_year=0;
    // this.questionData.experience_month=0;

    this.questionForm = this.formBuilder.group({
      salary: [this.questionData.salary, Validators.required],
      notice_period: [this.questionData.notice_period, Validators.required],
      experience_year: [this.questionData.experience_year, Validators.required],
      experience_month: [this.questionData.experience_month, Validators.required],
      questions_and_answers:['']
    });
    this.jobrefferal =localStorage.getItem('jobReferral');
  }

  save(form: any): boolean {
    this.questionData.salary = form.salary;    
    this.questionData.notice_period = form.notice_period;
    this.questionData.experience_year= form.experience_year;
    this.questionData.experience_month= form.experience_month;
    this.questionData.questions_and_answers= form.questions_and_answers;
    this.applyjobService.setQuestionFormData(this.questionData);
    return true;
  }

  get formControls() { return this.questionForm.controls; }

  changeRadioButton(event,question,index) {
    this.questions_and_answers[index]={"question":question,"answer":event.value};
  }
  
  applyJobGetquestion(){
     this.homeService.applyJobGetquestion(
      this.jobId,
      (res:any)=>{
        this.question =res.questions;
      },
      err=>{
        this.commonService.showError(err.message);
      }
    )
  }

  getAdditionalQuestion(){
    this.homeService.getAdditionalQuestion(
      (res:any)=>{
        this.additionalquestion =res.additional_info;
        // console.log(this.additionalquestion);
        this.setValuesInForm();
      },
      err=>{
        this.commonService.showError(err.message);
      }
    )
  }

  setValuesInForm(){
      this.questionForm.setValue({
        salary: this.additionalquestion.salary,
        notice_period: this.additionalquestion.notice_period,
        experience_year:this.additionalquestion.experience_year,
        experience_month: this.additionalquestion.experience_month,
        questions_and_answers:''
      })
  }

  onNoClick(): void {
    localStorage.removeItem('applyjbId');
  }

  gotoback(){
    if(this.save(this.questionForm.value)){
      const dialogRef = this.dialog.open(ApplyJobComponent, {
        width: '600px',
        height: '430px',
        data: {  }
      });
      this.dialogRef.close();
      dialogRef.afterClosed().subscribe(result => {
        localStorage.removeItem('applyjbId');
      });
    }
  }

  closeDialog(){
    this.formData = this.applyjobService.getFormData();
    this.applyjobService.removeQuestionFormData();
    this.dialogRef.close();
    this.formData.referral_code ='';
  }

  applyJob(){
    let source;

    // const dialogRefApplyJob = this.dialog.open(JobApplySuccessComponent, {
    //   width: '600px',
    //   height: '430px',
    //   data: {id: this.jobId}
    // });
    // this.dialogRef.close();
    // return;

    this.questionForm.get('questions_and_answers').setValue(this.questions_and_answers);
    this.submitted = true;
    if(this.questions_and_answers.length != this.question.length){
      this.commonService.showError("fill question and answer..");
      return;
    }

    if(this.questionForm.value.salary ==''){
      this.commonService.showError("Please enter Current Sallary.....");
    }
    if(this.questionForm.value.notice_period ==''){
      this.commonService.showError("Please Select Notice Period.....");
    }
    if(this.questionForm.value.experience_year ==''){
      this.commonService.showError("Please Select Year Of Experience .....");
    }
    if(this.questionForm.value.experience_month ==''){
      this.commonService.showError("Please Select Months.....");
    }
  
    if (this.questionForm.invalid) {
      return;
    }
   
    if(this.save(this.questionForm.value)){
      this.formData = this.applyjobService.getFormData();
      this.homeService.utm_source.subscribe(src=>{
        source = src;
       
    })
      // console.log(this.formData);
      const formdataObj = new FormData();
          formdataObj.append("job_id",this.jobId)
          if(this.jobrefferal !="null"){
          formdataObj.append("referral_code",this.formData.referral_code)
          }
          formdataObj.append("first_name",this.formData.first_name);
          formdataObj.append("last_name",this.formData.last_name);
          formdataObj.append("mobile",this.formData.mobile);
          formdataObj.append("salary",this.formData.salary);
          formdataObj.append("notice_period",this.formData.notice_period);
          formdataObj.append("experience_year",this.formData.experience_year);
          formdataObj.append("experience_month",this.formData.experience_month);
          formdataObj.append("source",source);

          if(this.questions_and_answers.length) {
          formdataObj.append("questions_and_answers",JSON.stringify(this.questions_and_answers));
        }
           
        this.homeService.applyJobFormData(
          formdataObj,
         res => {
         if (res.success) {
           this.applyjobService.removeQuestionFormData();
           this.dialogRef.close();
           localStorage.removeItem('source');

          //-----Removing formData obj valeus on applying the job
          this.formData.referral_code ='';

          //---------------
          const dialogRefApplyJob = this.dialog.open(JobApplySuccessComponent, {
            width: '600px',
            height: '460px',
            data: {id: this.jobId}
          });
          //------------------------
          
          this.commonService.showMessage(res.message);
         } 
       },
      err => {
        this.commonService.showError(err.message);
      }
    );
    }
  }
  
}
