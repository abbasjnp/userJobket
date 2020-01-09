import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './../../home/job-detail/job-detail.component';
import { environment } from './../../../environments/environment';
import { CommonService } from './../../shared/services/common.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { AccountService } from './../../account/account.service'
import { HomeService } from '../home.service';

@Component({
  selector: 'app-refer-now',
  templateUrl: './refer-now.component.html',
  styleUrls: ['./refer-now.component.scss']
})
export class ReferNowComponent implements OnInit {
  shareJob: any;
  copyLink;
  referral_code;
  title;
  baseUrl = environment.baseUrl;
  token;
  refferalReward;
  CatName;
  subCatName;
  location;
  constructor(public dialogRef: MatDialogRef<ReferNowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public commonService: CommonService,
    public meta: Meta,
    private router: Router,
    // private accountService: AccountService,
    private homeService: HomeService,
  ) {
    this.shareJob = data;
    this.referral_code = localStorage.getItem('my_referral_code');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeSpaceWithDash(str) {
    if (str) {
      var str1 = str.replace(/\//g, ' ');
      return (str1.replace(/ /g, "-"));
    }
  }
  ngOnInit() {
    // console.log(this.shareJob, "shr job");
    this.CatName = this.removeSpaceWithDash(this.shareJob.data.cat_subcat_id.cat_name);
    this.subCatName = this.removeSpaceWithDash(this.shareJob.data.cat_subcat_id.sub_cat_name);
    this.location = this.shareJob.data.location;
    // console.log(this.CatName, this.subCatName, "cat & subCatname");
    this.refferalReward = this.shareJob;
    this.token = localStorage.getItem('token');
    var str = this.shareJob.data.designation;
    // console.log(this.shareJob,"share job");
    var dstr = str.replace(/[{()}]/g, ' ');
    var str1 = dstr.replace(/\//g, ' ');
    this.title = str1.replace(/ /g, "-");

    // var pageURL = "Unique Code:" + this.referral_code + "\n" + "URL : " + window.location.origin + '/job-detail/' + this.shareJob.data.job_id + '/' + this.title + '?ref=' + this.referral_code;
    var pageURL ="Unique Code:" + this.referral_code + "\n" + "URL : "+ this.createPageUrl();
    this.copyLink = pageURL;
  }
  createPageUrl() {
    let urlCat = window.location.origin + '/' + this.CatName + '-jobs' +  '/' + this.title + '/' + this.location + '/' + this.shareJob.data.job_id + '?ref=' + this.referral_code;
    let urlSubCat = window.location.origin + '/' + this.CatName + '-jobs' + '/' + this.subCatName + '-jobs' + '/' + this.title + '/' + this.location + '/' + this.shareJob.data.job_id + '?ref=' + this.referral_code;
    if (this.CatName && this.subCatName != undefined){
      return urlSubCat;       
    }
   else if (this.CatName){
      return urlCat;    
   }   
  }

  shareOnFB() {
    this.countHits('facebook');
    var heading = this.shareJob;
    // var pageURL = window.location.origin + '/job-detail/' + this.shareJob.data.job_id + '/' + this.title + '?ref=' + this.referral_code;
     var pageURL = this.createPageUrl(); 
    var title = this.shareJob.data.company_name;
    var descr = this.shareJob.data.designation;
    var image = this.baseUrl + '' + this.shareJob.data.company_logo;
    var signinWin = window.open("http://www.facebook.com/sharer.php?s=100&title=" + heading + "&u=" + pageURL + "&images=" + image, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + 300 + ",top=" + 200);
    signinWin.focus();
    return false;
  }
  shareOnLinkedIn() {
    this.countHits('linkedin');
    var heading = this.shareJob;
    // var pageURL = window.location.origin + '/job-detail/' + this.shareJob.data.job_id + '/' + this.referral_code + '/' + this.title;
    // var pageURL = "https://jobket.in/" + '/job-detail/' + this.shareJob.data.job_id + '/' + this.title + '?ref%3D' + this.referral_code;
    var pageURL = this.createPageUrl();   
    var title = this.shareJob.company_name;
    var descr = this.shareJob.data.designation;
    var image = this.baseUrl + '' + this.shareJob.data.company_logo;
    var signinWin = window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + pageURL, "SignIn" + this.referral_code, "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + 300 + ",top=" + 200);
    signinWin.focus();
    return false;
  }
  detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }
  shareOnWhatsApp() {
    this.countHits('whatsapp');
    var heading = this.shareJob;
    //  var pageURL = window.location.origin + '/job-detail/' + this.shareJob.data.job_id + '/'+ this.title + '?ref='+ this.referral_code;
    // var pageURL = "Let's get refer with your referral code and earn money upto 100000 on your first referral" + ' ' + 'https://jobket.in' + '/job-detail/' + this.shareJob.data.job_id + '/' + this.title + '?ref=' + this.referral_code;
    var pageURL = "Let's get refer with your referral code and earn money upto 100000 on your first referral " + this.createPageUrl();

    var title = this.shareJob.data.company_name;
    var descr = this.shareJob.data.designation;
    var image = this.baseUrl + '' + this.shareJob.data.company_logo;
    var ismobile = this.detectmob();
    if (ismobile) {
      var signinWin = window.open("https://api.whatsapp.com/send?text=" + pageURL, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + 300 + ",top=" + 200);
    }
    else {
      var signinWin = window.open("https://web.whatsapp.com/send?text=" + pageURL, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + 300 + ",top=" + 200);
    }
    signinWin.focus();
    return false;
  }

  // shareOnTwiter() {
  //   var heading = this.shareJob;
  //   var pageURL = "Referral Code:"+this.referral_code+" "+ window.location.origin + '/job-detail/' + this.shareJob.data.job_id + '/' + this.referral_code + '/' + this.shareJob.data.designation;
  //   var title = this.shareJob.data.company_name;
  //   var descr = this.shareJob.data.designation;
  //   var image = this.baseUrl + '' + this.shareJob.data.company_logo;
  //   var signinWin = window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + pageURL + "&title=" + heading + "&summary=Testsource=" + pageURL, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + 300 + ",top=" + 200);
  //   signinWin.focus();
  //   return false;
  // }
  countHits(hitData) {
    this.homeService.countHitsOnRefer(
      {
        'job_id': this.shareJob.data.job_id,
        'platform': hitData
      },
      res => { console.log(res) },
      err => { }
    )
  }
  copyLinkToClipboard(copyCode) {
    if (copyCode == 'refferal') {
      this.countHits('copyreferral');
      var copyText = (document.getElementById('refferal') as HTMLInputElement).select();
      document.execCommand("copy");
      this.commonService.showMessage("Refferal Code Copied to Clipboard");
    }
    if (copyCode == 'link') {
      this.countHits('copylink');
      var copyText = (document.getElementById('myInput') as HTMLInputElement).select();
      document.execCommand("copy");
      this.commonService.showMessage("Link Copied to Clipboard");
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
