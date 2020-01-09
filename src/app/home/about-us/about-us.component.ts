import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('A unique referral job platform that brings out quality in the hiring process!');
    this.meta.updateTag({property:'og:url', content:'https://jobket.in/about-us'});
    this.meta.updateTag({property:'og:title',content:'A unique referral job platform that brings out quality in the hiring process!'});
    this.meta.updateTag({name:'description', content:'Jobket is a platform that allows you to find suitable jobs for yourself and your family and friends.'});
    this.meta.updateTag({property:'og:description', content:'Jobket is a platform that allows you to find suitable jobs for yourself and your family and friends.'});
 
 
  }

}
