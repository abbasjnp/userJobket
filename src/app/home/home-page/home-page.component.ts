import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from './../home.service';
import { AuthServices } from './../../core/auth/auth.service';
import { ApplyJobComponent } from '../apply-job/job/apply-job.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from './../../account/account.service';
import { ReferNowComponent } from '../refer-now/refer-now.component';
import { CommonService } from './../../shared/services/common.service';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';
import * as $ from 'jquery';
//  import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  jobList;
  isStrength;
  strength;
  Status;
  isLoggedIn;
  resume_strength;
  baseUrl = environment.baseUrl;
  public navs: any;
  count = 1;
  bannerImg1;
  bannerImg2;
  bannerImg3;
  clientLogo1;
  clientLogo2;
  clientLogo3;
  clientLogo4;
  clientLogo5;
  clientLogo6;
  clientLogo7;
  clientLogo8;
  clientLogo9;
  clientLogo10;
  clientLogo11;
  userImg1;
  userImg2;
  userImg3;
  userImg4;
  userImg5;
  viewMoreDesk;
  oval1;
  constructor(private location: Location, private homeService: HomeService, private router: Router, private authService: AuthServices, public dialog: MatDialog, public accountService: AccountService, public commonService: CommonService, @Inject(DOCUMENT) private dom
    , private title: Title, private meta: Meta) { }

  ngOnInit() {
    console.log("isSafari", this.isSafari);
    if (this.isSafari) {
      this.bannerImg1 = './../../../assets/img/ban1-new.png';
      this.bannerImg2 = './../../../assets/img/rakuten.png';
      this.bannerImg3 = 'banner-3';
      this.clientLogo1 = './../../../assets/img/clients/2.png';
      this.clientLogo2 = './../../../assets/img/clients/your-story.png';
      this.clientLogo3 = './../../../assets/img/clients/3.png';
      this.clientLogo4 = './../../../assets/img/clients/4.png';
      this.clientLogo5 = './../../../assets/img/clients/5.png';
      this.clientLogo6 = './../../../assets/img/clients/6.png';
      this.clientLogo7 = './../../../assets/img/clients/7.png';
      this.clientLogo8 = './../../../assets/img/clients/8.png';
      this.clientLogo9 = './../../../assets/img/clients/9.png';
      this.clientLogo10 = './../../../assets/img/clients/10.png';
      this.clientLogo11 = './../../../assets/img/clients/11.png';
      this.userImg1 = './../../../assets/img/1.png';
      this.userImg2 = './../../../assets/img/2.png';
      this.userImg3 = './../../../assets/img/4.png';
      this.userImg4 = './../../../assets/img/5.png';
      this.userImg5 = './../../../assets/img/6.png';
      this.viewMoreDesk = './../../../assets/img/view-moredesk.png';
      this.oval1 = './../../../assets/img/oval-1.png';
    }
    else {
      this.bannerImg1 = './../../../assets/img/webp_mainpage/1st_banner_PC.webp';
      this.bannerImg2 = './../../../assets/img/webp_mainpage/2nd_banner_PC.webp';
      this.bannerImg3 = 'banner-3-1';
      this.clientLogo1 = './../../../assets/img/webp_mainpage/business_standard.webp';
      this.clientLogo2 = './../../../assets/img/webp_mainpage/yourstory.webp';
      this.clientLogo3 = './../../../assets/img/webp_mainpage/yahoonews.webp';
      this.clientLogo4 = './../../../assets/img/webp_mainpage/businessline.webp';
      this.clientLogo5 = './../../../assets/img/webp_mainpage/techcircle.webp';
      this.clientLogo6 = './../../../assets/img/webp_mainpage/vccircle.webp';
      this.clientLogo7 = './../../../assets/img/webp_mainpage/volanews.webp';
      this.clientLogo8 = './../../../assets/img/webp_mainpage/inc42.webp';
      this.clientLogo9 = './../../../assets/img/webp_mainpage/outlook.webp';
      this.clientLogo10 = './../../../assets/img/webp_mainpage/businesstelegrapoh.webp';
      this.clientLogo11 = './../../../assets/img/webp_mainpage/peoplematters.webp';
      this.userImg1 = './../../../assets/img/webp_mainpage/vivek.webp';
      this.userImg2 = './../../../assets/img/webp_mainpage/yogaraj.webp';
      this.userImg3 = './../../../assets/img/webp_mainpage/omprakash.webp';
      this.userImg4 = './../../../assets/img//webp_mainpage/Lchange.webp';
      this.userImg5 = './../../../assets/img//webp_mainpage/Lshruti.webp';
      this.viewMoreDesk = './../../../assets/img/webp_mainpage/viewmore_PC.webp';
      this.oval1 = './../../../assets/img/webp_mainpage/viewmore_mobile.webp';
    }
    this.categoryNavigationData();
    this.title.setTitle('Jobket: Job Search | Employment | Recruiting Firm | Jobs in 2019');
    this.meta.updateTag({ property: 'og:url', content: 'https://jobket.in' });
    this.meta.updateTag({ property: 'og:title', content: 'Jobket: Job Search | Employment | Recruiting Firm | Jobs in 2019' });
    this.meta.updateTag({ name: 'description', content: 'Jobket is one of the India\'s\ largest assessment and recruitment company. We specialize in matching talents with most suitable jobs. Signup for Free' });
    this.meta.updateTag({ property: 'og:description', content: 'Jobket is one of the India\'s\ largest assessment and recruitment company. We specialize in matching talents with most suitable jobs. Signup for Free' });
    this.homeService.status.subscribe(status => {
      this.getAllJobs();
    });

    if (this.strength) {
      this.isStrength = this.strength;
      return;
    }

    if (this.strength == '' || this.strength == null) {
      this.authService.strength.subscribe(status => {
        this.isStrength = status;
        this.getAllJobs();
        if (this.isStrength != null) {
          setTimeout(() => {
            this.getAllJobs();
          }, 1000);
        }
      });
    }
    var pageURL = "https://jobket.in";
    this.createCanonicalURL(pageURL);
  }

  categoryNavigationData() {
    this.homeService.categoryNavigation(
      (res: any) => {
        if (res.success == true) {
          this.navs = res.categories;
          // console.log(res);
        }
      },
      err => {
        this.commonService.showError(err.message);
      });
  }

  categoryNavigation(navData) {
    var str = navData.name;
    navData.name = str.replace(/ /g, "-");
    console.log(navData.name, "nameeee");
    const navigationExtras: NavigationExtras = {
      state: {
        id: navData.id,
        name: navData.name
      }
    };
    this.router.navigate(["/" + navData.name + '-jobs'], navigationExtras)
    //  this.rout.navigate(["/" + catSubNav.name + '-jobs']);
  }
  searchJobDesignation(searchItem) {
    searchItem= searchItem.trim();   
    if(searchItem==''){
      return;
    }
    var str;
    if(searchItem.includes(' jobs')){
      searchItem = searchItem.replace(" jobs", "");
    }
    if(searchItem.includes(' job')){
      searchItem = searchItem.replace(" job", "");
    }
    if(searchItem.includes('jobs')){
      searchItem = searchItem.replace("jobs", "");
    }
    if(searchItem.includes('job')){
      searchItem = searchItem.replace("job", "");
    }
    
    if(searchItem.includes(' job ')){
      searchItem = searchItem.replace(" job ", "");
    }
    console.log(str, "strrrrrrrr");
  
    if(searchItem.includes(' ')){
      str = searchItem.replace(/ +(?= )/g,'');  //Remove more than one space in single spance
      // searchItem.trim();       
      
     str = str.split(' ');
     searchItem = str.join('-');
    }
    // else{
    //   str = searchItem.split(',');
    //   searchItem = str.join('-');
    // }
    
    this.router.navigate([`search-${searchItem}-jobs`]);
    // const navigatedSearchItem: NavigationExtras = {
    //   queryParams: {
    //     item: searchItem
    //   }
    // };
    // this.router.navigate(["/search-jobs/"], navigatedSearchItem);
  }

  createCanonicalURL(url?: string) {
    let canURL = url == undefined ? this.dom.URL : url;
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }

  job_Designation_router(job) {
   this.homeService.routeJobDetailPage(job);
  }
  getAllJobs() {
    this.homeService.getTotalJobs(
      (res: any) => {
        if (res.success) {
          this.jobList = res.jobs;
        }
      },
      err => {
        this.commonService.showError(err.message);
      },
      this.count
    );
  }
  // updateResume(){
  //   if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
  //     // let currentUrl = '/job-detail/' + jobID;
  //     // localStorage.setItem('redirectUrl', currentUrl);
  //     this.accountService.openSignUpDialog(); 
  //     return;
  //   }else{
  //     this.router.navigate(['/myprofile-info/profile/resume']);
  //   }
  // }
  applyDialog(jobID) {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
      localStorage.setItem('jobId', jobID);
      let currentUrl = '/job-detail/' + jobID;
      // console.log(jobID)
      localStorage.setItem('redirectUrl', currentUrl);
      this.accountService.openLoginDialog();
      return;
    }
    const dialogRef = this.dialog.open(ApplyJobComponent, {
      width: '600px',
      height: '430px',
      data: { id: jobID }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }
  referDialog(jobData) {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
      let currentUrl = '/job-detail/' + jobData.job_id;
      localStorage.setItem('redirectUrl', currentUrl);
      this.accountService.openLoginDialog();
      return;
    }

    const dialogRef = this.dialog.open(ReferNowComponent, {
      width: '600px',
      height: '430px',
      data: { data: jobData }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  imagebuttonclick(url: any) {
    console.log("clicked");
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // this.router.navigate(['/job-detail', jobID, designation])
      window.location.href = url;
    }

  }
  imagebuttonclick1(url: any) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.router.navigate([url]);
      // window.location.href = url;
    }
  }

}