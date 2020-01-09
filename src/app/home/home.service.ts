import { Injectable } from '@angular/core';
import { DataService } from './../core/http/data.service';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  allJobsData;
  applyStatus;

  public status = new BehaviorSubject<any>(this.applyStatus); // {1}
  public utm_source = new BehaviorSubject<any>(null);

  private jobID;
  get jobId() {
    return this.jobID;
  }

  set jobId(jobID) {
    this.jobID = jobID;
  }

  get isStatus() {
    return this.status.asObservable(); // {2}
  }

  serviceUrl = environment.baseUrl + 'authentication/';
  serviceUrl1 = environment.baseUrl + 'user/';

  constructor(private dataService: DataService,
              private router:Router,
              private deviceService: DeviceDetectorService) { }

  public getAllJobs(successCall, errorCall) {
    this.dataService.get(this.serviceUrl + 'get-all-jobs-v3/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
          this.allJobsData = res;
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }
  removeSpaceWithDash(str){
    if(str){
      var str1 = str.replace(/\//g, ' ');
      var dstr = str1.replace(/[{()}]/g, ' ');
      return (dstr.replace(/ /g, "-"));
    }
  }
  routeJobDetailPage(job){
    console.log(job);
    const isMobile = this.deviceService.isMobile();
    console.log("isMobile",isMobile);
    let CatName =this.removeSpaceWithDash(job.cat_subcat_id.cat_name);
    let subCatName =this.removeSpaceWithDash(job.cat_subcat_id.sub_cat_name);   
    console.log(job, "jobs")
    // job.designation = job.designation.replace(/ /g, "-");
    let designation = this.removeSpaceWithDash(job.designation);
    if (CatName && subCatName) {
      if(isMobile)
      this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + designation + '/' + job.location + '/' + job.job_id]);
      else
      window.open(`/${CatName}-jobs/${subCatName}-jobs/${designation}/${job.location}/${job.job_id}`,'_blank');
    }
    else if (CatName){
      if(isMobile)
      this.router.navigate(['/' + CatName + '-jobs' + '/' + designation + '/' + job.location + '/' + job.job_id]);
      else
      window.open(`/${CatName}-jobs/${designation}/${job.location}/${job.job_id}`);
   }
  }

  public getTotalJobs(successCall, errorCall,page?, catId?, subCatId?) {
    var url: string='get-all-jobs-v3/?page='+page;
    if ((catId == '' || catId == undefined) && (subCatId == '' || subCatId == undefined))
      url =url;
    else if (catId != '' && (subCatId == '' || subCatId == undefined))
      url = url + '&category_id=' + catId;
    else
      url = url + '&category_id=' + catId + '&sub_category_id=' + subCatId;

    this.dataService.get(this.serviceUrl + url).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
          this.allJobsData = res;
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public getSinglePageJobs(successCall, errorCall,page?, catId?, subCatId?,jobId?) {
    var url: string='get-all-jobs-v3/?page='+page+'&job_id_single_page='+jobId;
    if ((catId == '' || catId == undefined) && (subCatId == '' || subCatId == undefined))
      url =url;
    else if (catId != '' && (subCatId == '' || subCatId == undefined))
      url = url + '&category_id=' + catId;
    else
      url = url + '&category_id=' + catId + '&sub_category_id=' + subCatId;

    this.dataService.get(this.serviceUrl + url).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
          this.allJobsData = res;
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public getPreferableJobs(categoryId,successCall, errorCall){
    this.dataService.get(this.serviceUrl + 'get-related-jobs/?job_id='+categoryId).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
          this.allJobsData = res;
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }
  // authentication/search-job/?search=shell
  //Search Jobs and Designation at search page
  searchJobDesignation(page,data, successCall, errorCall) {
    console.log(page,"counttt");  
    this.dataService.get(this.serviceUrl + 'search-job/?page='+page+'&search='+data.skills+'&location='+data.locations+'&min_salary='+data.minSalary+'&max_salary='+data.maxSalary+'&min_experience='+data.minExp+'&max_experience='+data.maxExp).subscribe(

    // this.dataService.get(this.serviceUrl + 'search-job/?search=' + searchItem).subscribe(
      (res: any) => {
        if (res.success)
          successCall(res);
        else
          errorCall(res);
      },
      err => {
        errorCall(err);
      }
    )
  }
  updateJobDetailSchema(jobId, successCall,errorCall){
    this.dataService.get(this.serviceUrl+'job-metatag/?job_id='+jobId).subscribe(
      res=>{
        successCall(res);
      },
      err=>{
        errorCall(err);
      }
    )
  }
  searchResult(searchKey, successCall,errorCall){
    this.dataService.get(this.serviceUrl+'search-result/?search='+searchKey).subscribe(
      res=>{
        successCall(res);
      },
      err=>{
        errorCall(err);
      }
    )
  }

  getFilteredNumberOfJobs(page,data,successCall,errorCall){
   
    this.dataService.get(this.serviceUrl + 'search-result/?page='+page+'&category_id=' +data.categoryId+'&sub_category_id='+data.subCategoryId+'&location='+data.locations+'&min_salary='+data.minSalary+'&max_salary='+data.maxSalary+'&min_experience='+data.minExp+'&max_experience='+data.maxExp)
    .subscribe(
      (res: any) => {
        if (res.success)
          successCall(res);
        else
          errorCall(res);
      },
      err => {
        errorCall(err);
      }
    )

  }

  filterJobs(page,data, successCall, errorCall) {
    // debugger;
    // console.log(data)
    this.dataService.get(this.serviceUrl + 'get-all-jobs-v3/?page='+page+'&category_id=' +data.categoryId+'&sub_category_id='+data.subCategoryId+'&location='+data.locations+'&min_salary='+data.minSalary+'&max_salary='+data.maxSalary+'&min_experience='+data.minExp+'&max_experience='+data.maxExp)
    .subscribe(
      (res: any) => {
        if (res.success)
          successCall(res);
        else
          errorCall(res);
      },
      err => {
        errorCall(err);
      }
    )
  }

  public countHitsOnRefer(data, successCall, errorCall) {
    console.log(data,"data")
    let url = this.serviceUrl1 + 'job-share-button/';
    this.dataService.post(url, data).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }


  public contactUs(data, successCall, errorCall) {
    let url = this.serviceUrl1 + 'contact-us-user/';
    this.dataService.post(url, data).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }

  public jobDetails(id, successCall, errorCall) {
    this.dataService.get(this.serviceUrl + 'job-single-page/' + id).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }


  public checkReferralCode(data, successCall, errorCall) {
    let url = this.serviceUrl1 + 'validate-referral-code/';
    this.dataService.post(url, data).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall(err);
      }
    );
  }

  public getApplyJObData(successCall, errorCall) {
    this.dataService.get(this.serviceUrl1 + 'job-apply/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public uploadResumeFile(formData, successCall, errorCall) {
    this.dataService.post(this.serviceUrl1 + 'resume-upload/v2/', formData).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }

  public applyJobFormData(data, successCall, errorCall) {
    this.dataService.post(this.serviceUrl1 + 'job-apply/', data).subscribe(
      (res: any) => {
        if (res.success) {
          this.status.next(res.success);
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }


  public applyJobGetquestion(jobid, successCall, errorCall) {
    this.dataService.get(this.serviceUrl + 'job-questions/?job_id=' + jobid).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public getAdditionalQuestion(successCall, errorCall) {
    this.dataService.get(this.serviceUrl1 + 'job-apply-additional-info/v2/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public changePassword(data, successCall, errorCall) {
    this.dataService.post(this.serviceUrl + 'change-password/', data).subscribe(
      (res: any) => {
        if (res.success) {
          this.status.next(res.success);
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }


  public setUserProfileData(data, successCall, errorCall) {
    this.dataService.post(this.serviceUrl1 + 'profile/v2/', data).subscribe(
      (res: any) => {
        if (res.success) {
          this.status.next(res.success);
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }

  getUserProfileData(successCall, errorCall) {
    this.dataService.get(this.serviceUrl1 + 'profile/v2/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public getLocationList(data, successCall, errorCall) {
    this.dataService.get(this.serviceUrl + 'search-location/?location=' + data).subscribe(
      (res: any) => {
        successCall(res);

      },
      err => {
        errorCall(err);
      }

    )
  }
  public fetchLookupList(partialUrl, options, successCall, errorCall) {
    let url = this.serviceUrl + partialUrl + '/';
    this.dataService.get(url, options).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall(err);
      }
    );
  }



  public uploadProfilePic(formData, successCall, errorCall) {
    let url = this.serviceUrl1 + 'image/';
    this.dataService.uploadFile(url, formData, false).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }
  fetchResumeData(successCall, errorCall) {
    this.dataService.get(this.serviceUrl1 + 'resume/v2/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public postResumeData(data, successCall, errorCall) {
    this.dataService.post(this.serviceUrl1 + 'resume/v2/', data).subscribe(
      (res: any) => {
        if (res.success) {
          this.status.next(res.success);
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }


  getBlock(partialUrl, successCall, errorCall) {
    this.dataService.get(this.serviceUrl1 + partialUrl + '/v2/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }
  // categoryId:any;
  public categoryNavigation(successCall, errorCall) {
    this.dataService.get(this.serviceUrl + 'job-categories/').subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }
  //  http://192.168.1.149:9000/authentication/job-sub-categories/?category_id=1

  public subCategory(subcategoryId, successCall, errorCall) {
    //  this.categoryId =subcategoryId;
    this.dataService.get(this.serviceUrl + 'job-sub-categories/?category_id=' + subcategoryId).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  deleteBlock(partialUrl, id, successCall, errorCall) {
    this.dataService.delete(this.serviceUrl1 + partialUrl + '/v2/' + id).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);

        }
        else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    )
  }

  public withdrawAmount(data, successCall, errorCall) {
    let url = this.serviceUrl1 + 'withdraw-request/v2/';
    this.dataService.post(url, data).subscribe(
      (res: any) => {
        if (res.success) {
          successCall(res);
        } else {
          errorCall(res);
        }
      },
      err => {
        errorCall(err);
      }
    );
  }
  public getCatorSubcatId(catName,subCatName,successCall,errorCall){
    let data ={
      'category':catName,
      'sub_category':subCatName
    }
    this.dataService.post(this.serviceUrl + 'get-category-id/',data).subscribe(
      (res: any) => {
       
          successCall(res);
      
      
      },
      err => {
        errorCall(err);
      }
    )
  }

}
