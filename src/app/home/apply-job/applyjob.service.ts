import { Injectable } from '@angular/core';
import { ApplyJobFormData, ApplyFormData, ApplyQuestionData } from './applyformdata';

@Injectable({
  providedIn: 'root'
})
export class ApplyjobService {
  public formData: ApplyJobFormData = new ApplyJobFormData();
  constructor() { }

  getApplyFormData(): ApplyFormData {
    var applyFormData: ApplyFormData = {
      first_name: this.formData.first_name,
      last_name: this.formData.last_name,
      mobile: this.formData.mobile,
      referral_code: this.formData.referral_code
    };
    return applyFormData;
  }

  setApplyFormData(data: ApplyFormData) {
    this.formData.first_name = data.first_name;
    this.formData.last_name = data.last_name;
    this.formData.mobile = data.mobile;
    this.formData.referral_code = data.referral_code;
    console.log(this.formData.referral_code);
  }

  getQuestionFormData(): ApplyQuestionData {
    var questionFormData: ApplyQuestionData = {
      salary: this.formData.salary,
      notice_period: this.formData.notice_period,
      experience_year: this.formData.experience_year,
      experience_month: this.formData.experience_month,
      questions_and_answers: this.formData.questions_and_answers
    };
    return questionFormData;
  }

  setQuestionFormData(data: ApplyQuestionData) {
    this.formData.salary = data.salary;
    this.formData.notice_period = data.notice_period;
    this.formData.experience_year = data.experience_year;
    this.formData.experience_month = data.experience_month;
    this.formData.questions_and_answers = data.questions_and_answers;
  }

  getFormData(): ApplyJobFormData {
    // Return the entire Form Data
    return this.formData;
  }
  removeQuestionFormData() {
    this.formData.salary = '';
    this.formData.notice_period = '';
    this.formData.experience_year = '';
    this.formData.experience_month = '';
    this.formData.questions_and_answers = [];
  }
}
