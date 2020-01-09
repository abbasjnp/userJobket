import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthServices } from './../../core/auth/auth.service';
import { AccountService } from './../../account/account.service';
import { ActivatedRoute, Router } from '@angular/router'
import * as $ from 'jquery';

export interface DialogData {
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  user: any;
  isLoggedIn;

  
  constructor(private authService: AuthServices, public accountService: AccountService,
    private router: Router) {


  }
  routeTOSearchPage() {
    // this.router.navigateByUrl('/category/Software%20Engineer/Ios', { skipLocationChange: true }).then(() =>
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    
      this.router.navigate(["search-jobs"]));
  }

  loginDialog() {
    this.accountService.openLoginDialog('header');
    
  }  

  signUpDialog() {
    this.accountService.openSignUpDialog('applyjob');
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('loggedIn');
  
    // if(this.isLoggedIn == true){
    //   return;
    // }

    // // this.isLoggedIn = localStorage.getItem('loggedIn')
    // if(this.isLoggedIn == false || this.isLoggedIn == null){
    //   this.authService.loggedIn.subscribe(status => {
    //     this.isLoggedIn = status;
    //     console.log(this.isLoggedIn,"=>>>>>>>>>>>>>")
    //   });
    // } 

    // this.authService.user.subscribe(usr => {
    //   this.user = usr;
    // });
  }
  ngAfterContentChecked() {
    this.isLoggedIn = localStorage.getItem('loggedIn');
  }
}
