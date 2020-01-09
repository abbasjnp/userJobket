import { Component, OnInit, HostListener, ElementRef, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplyJobComponent } from '../apply-job/job/apply-job.component';
import { ReferNowComponent } from '../refer-now/refer-now.component';
import { HomeService } from './../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { AccountService } from './../../account/account.service';
import { CommonService } from './../../shared/services/common.service';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from './../../core/http/data.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'angularx-social-login';
import { AuthServices } from './../../core/index.core';
//import {SignupdoneDialogComponent} from './../../account/signupdone-dialog/signupdone-dialog.component';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})

export class JobDetailComponent implements OnInit, OnDestroy {
  data: boolean = true;
  jobId;
  jobDetail;
  allJobsDAtas;
  referral_code;
  applyJobid;
  jobrefferal;
  company_name;
  title;
  upDateTitle;
  isShow: boolean;
  topPosToStartShowing = 100;
  description;
  basepath = environment.baseUrl;
  public lat: Number;
  public lng: Number;
  jobsCount = 1;
  count = 1;
  total_pages;
  jobsLoaded = false;
  jobs = [];
  jobsList = [];
  jobsLength;
  jobsFound = 0;
  page = 5;
  number_of_jobs;
  serviceUrl = environment.baseUrl + 'authentication/';
  baseUrl = environment.baseUrl1;
  url;
  isSticky: boolean = false;
  isOpen: boolean = true;
  imgSrc;
  catId;
  subCatId;
  chkrefer;
  chkapplyjob;
  jobSTatus;
  utm_source;
  schema=[];
  constructor(
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog,
    private meta: Meta,
    private title1:Title,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthServices,
    public accountService: AccountService,
    public commonService: CommonService, @Inject(DOCUMENT) private dom,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.jobId = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.upDateTitle = this.title;
    this.title = this.title.split('-').join(' ');
    homeService.jobId = this.jobId;
    this.imgSrc = localStorage.getItem('imgSrc');
    this.url = this.baseUrl.concat(this.router.url);
  }
  // @HostListener('window:scroll', ['$event'])

  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 1200; 
  //   this.authService.openDialog.subscribe(
  //     value=>{
  //       this.isOpen=value;
  //       console.log(value);
  //     }
  //   )
  //   if(this.isSticky && this.isOpen){

  //     if(!localStorage.getItem('token')){
  //      this.referDialog(this.jobDetail,'scroll');

  //     }
  //   }

  // }
  getFirstPart(str) {
    if (str) {
      return str.split('-jobs')[0];

    }
  }
  // use the function:
  ngOnInit() {
    // setTimeout(() => {
    this.updateMetaTags();
    // }, 2000);
    this.jobDetails();
    this.jobId = this.activatedRoute.snapshot.paramMap.get('id');
    let categoryName = this.getFirstPart(this.activatedRoute.snapshot.paramMap.get('categorytitle'));
    let subCategoryName = this.getFirstPart(this.activatedRoute.snapshot.paramMap.get('subcategorytitle'));
    let location = this.activatedRoute.snapshot.paramMap.get('location');
    this.activatedRoute.queryParams.subscribe(params => {
      this.referral_code = params['ref'];
      this.utm_source = params["utm_source"];
      this.homeService.utm_source.next(this.utm_source);
    });
    console.log(this.referral_code, "referal codeeeee");
    console.log(categoryName, "categoryName");
    console.log(subCategoryName, "subCategoryName");
    // this.referral_code = this.activatedRoute.snapshot.paramMap.get('referral_code');
    localStorage.setItem('jobId', this.jobId);
    localStorage.setItem('jobReferral', this.referral_code);
    localStorage.setItem('title', this.title);
    localStorage.setItem('source', this.utm_source);
    localStorage.setItem('category-name', categoryName);
    localStorage.setItem('sub-category-name', subCategoryName);
    localStorage.setItem('location', location);
    // Set redirectUrl if login from header is done using copylink
    let currentUrl = '/job-detail/'
    localStorage.setItem('redirectUrl', currentUrl);
    //--------------------------------------------------
    this.applyJobid = localStorage.getItem('jobId');
    this.jobrefferal = localStorage.getItem('jobReferral');
    console.log(this.jobrefferal, "jobreferall");
    this.homeService.status.subscribe(status => {
      this.jobDetails();
    });

    //----------------------------------------------------------------------
    var pageURL = "https://jobket.in";
    // var pageURL = window.location.origin;

    if (this.jobrefferal == null || this.jobrefferal == 'null' || this.jobrefferal=='undefined') {
      if (categoryName && subCategoryName)
        pageURL = `${pageURL}/${categoryName}-jobs/${subCategoryName}-jobs/${this.title}/${location}/${this.applyJobid}`
      else if (categoryName)
        pageURL = `${pageURL}/${categoryName}-jobs/${this.title}/${location}/${this.applyJobid}`
    } else {
      if (categoryName && subCategoryName)
        pageURL = `${pageURL}/${categoryName}-jobs/${subCategoryName}-jobs/${this.title}/${location}/${this.applyJobid}?ref=${this.jobrefferal}`
      else if (categoryName)
        pageURL = `${pageURL}/${categoryName}-jobs/${this.title}/${location}/${this.applyJobid}?ref=${this.jobrefferal}`
      // pageURL = pageURL + '/job-detail/' + this.applyJobid + '/' + this.jobrefferal;
    }
    console.log(pageURL,"pageUrl");
    console.log(this.url,"Url");

    // this.meta.updateTag({ property: 'og:url', content: this.url });
    // if (this.title != 'null') {
    //   this.meta.updateTag({ property: 'og:title', content: this.title });
    //   // pageURL = pageURL + '/' + this.upDateTitle;
    // }

    this.title1.setTitle(`${this.title}, in ${location}, Jobket.in`);
    this.meta.updateTag({ property: 'og:title', content: `${this.title}, in ${location}, Jobket.in` });
    this.meta.updateTag({ property: 'og:description', content: `Find ${this.title} job in ${location}, Jobket.in. India’s Most Trusted job portal. ${this.title} job in ${location} Jobket.in` });
    this.meta.updateTag({ name: 'description', content: `Find ${this.title} job in ${location}, Jobket.in. India’s Most Trusted job portal. ${this.title} job in ${location} Jobket.in` });
    this.meta.updateTag({ property: 'og:url', content: this.url});
    this.createCanonicalURL(pageURL);
  }
  updateMetaTags() {
    this.homeService.updateJobDetailSchema(
      this.jobId,
      res => {
        this.schema = res.meta_data;
        console.log(this.schema,"schema");
        let script = this.dom.createElement('script');
        script.type = `application/ld+json`;
        script.text = `${JSON.stringify(this.schema)}`;
        console.log(script.text,"texttt");
        this.dom.head.appendChild(script);
       
      },
      err => { }
    )
  }
  jobDetails() {
    this.homeService.jobDetails(
      this.jobId,
      (res: any) => {
        console.log(this.jobDetail, "jobDet");
        this.jobDetail = res.job_information;
        //  this.updateMetaTags();       
        this.catId = res.job_information.cat_subcat_id.cat_id;
        this.subCatId = res.job_information.cat_subcat_id.sub_cat_id;
        this.lng = this.jobDetail.longitude;
        this.lat = this.jobDetail.latitude;
        this.getAllJob(this.catId, this.subCatId);
      },
      err => {
        // this.commonService.showError(err.message);
      });
  }
  showMoreJobs() {
    this.jobsCount++;
    this.count++;
    this.getAllJob(this.catId, this.subCatId);
  }
  createCanonicalURL(url?: string) {
    let canURL = url == undefined ? this.dom.URL : url;
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }

  getAllJob(catId?, subCatId?) {
    this.homeService.getSinglePageJobs(
      (res: any) => {
        if (res.success) {
          if (this.jobsList.length == 0) {
            this.jobsList = res.jobs;
            this.total_pages = res.total_pages;
            this.number_of_jobs = res.number_of_jobs;
            this.jobsLength = this.jobsList.length;
            if (this.total_pages >= this.count && this.count != 1) {
              let result = res.jobs;
              for (let i in result) {
                let len = this.jobsList.length;
                this.jobsList[len] = result[i];
              }
              this.jobsLength = this.jobsList.length;
            }
          } else
            if (this.total_pages >= this.count && this.count != 1) {
              let result = res.jobs;
              for (let i in result) {
                let len = this.jobsList.length;
                this.jobsList[len] = result[i];
              }
              this.jobsLength = this.jobsList.length;
            }
          this.jobsLoaded = true;
        } else {
          this.jobsLoaded = false;
          this.jobs = [];
        }
      },
      err => {
        this.commonService.showError(err.message);
      },
      this.count,
      catId,
      subCatId,
      this.jobId
    );
  }
  jobDetailsPage(jobID, designation, job) {
    // let CatName =this.removeSpaceWithDash( job.cat_subcat_id.cat_name);
    // let subCatName =this.removeSpaceWithDash( job.cat_subcat_id.sub_cat_name);   
    this.homeService.jobDetails(
      jobID,
      (res: any) => {
        this.jobDetail = res.job_information;
        this.imgSrc = this.jobDetail.comapny_logo;
        this.lng = this.jobDetail.longitude;
        this.lat = this.jobDetail.latitude;
        this.homeService.routeJobDetailPage(job)
        //   var str = designation;
        //   var dstr = str.replace(/[{()}]/g, ' ');
        //   var str1 = dstr.replace(/\//g, ' ');
        //   designation = str1.replace(/ /g, "-");
        //   // console.log(designation,"/////////////////");
        //   // designation = designation.split('/').join('-');
        //   this.router.navigate(['/job-detail', jobID, designation]);

        //   if (CatName && subCatName) {
        //     this.router.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + designation + '/' + job.location + '/' + jobID]);
        //     // console.log('/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + designation + '/' + job.location + '/' + jobID,"subCat");

        //   }
        //   else if (CatName){
        //     this.router.navigate(['/' + CatName + '-jobs' + '/' + designation + '/' + job.location + '/' + jobID]);
        //     // console.log('/' + CatName + '-jobs' +  '/' + designation + '/' + job.location + '/' + jobID,"cat");

        //  }
        // window.scroll({
        //   top: 0,
        //   left: 0,
        //   behavior: 'smooth'
        // });
      },
      err => {
        // this.commonService.showError(err.message);
      });
  }
  // removeSpaceWithDash(str){
  //   if(str){
  //     var str1 = str.replace(/\//g, ' ');
  //     return (str1.replace(/ /g, "-"));
  //   }

  // }
  applyDialog(jobID, checkApplyJob) {
    this.chkapplyjob = checkApplyJob;
    if (jobID == this.applyJobid) {
      jobID = this.applyJobid;
    }
    this.homeService.jobId = jobID;
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
      let currentUrl = '/job-detail/';
      localStorage.setItem('redirectUrl', currentUrl);
      this.accountService.openSignUpDialog(this.chkapplyjob);
      return;
    }
    // const dialogRef = this.dialog.open(SignupdoneDialogComponent, {
    //   width: '380px',
    //   height: '550px',
    //   data: { type: 'signupdone' }
    // });
    const dialogRef = this.dialog.open(ApplyJobComponent, {
      width: '600px',
      height: '430px',
      data: { id: jobID }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  referDialog(jobData, checkrefer, scrollValue?) {
    this.chkrefer = checkrefer;
    console.log(this.chkrefer, '+>>>>>>>>>>>>');
    if (!scrollValue) {
      if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
        let currentUrl = '/job-detail/';
        localStorage.setItem('redirectUrl', currentUrl);
        // this.authService.jobData.next(jobData);
        this.accountService.openSignUpDialog(this.chkrefer, jobData);
        return;
      }
    }

    const dialogRef = this.dialog.open(ReferNowComponent, {
      width: '600px',
      height: '480px',
      data: { data: jobData }
    });
    this.isSticky = false;
    this.isOpen = false;
    let currentUrl = '/job-detail/' + jobData.job_id;
    localStorage.setItem('redirectUrl', currentUrl);
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem('currentUrl');
      // this.isSticky=false;
      //  this.authService.openDialog.next(false);   //Close refer pop opened on scroll    

    });
  }
  job_Designation_router(jobId: any, jobDesignation: any) {
    jobDesignation = jobDesignation.replace(/ /g, "-");
    this.router.navigate(['/job-detail/' + jobId + '/' + jobDesignation]);
  }
  ngOnDestroy() {
    localStorage.removeItem('source');
  }
}





