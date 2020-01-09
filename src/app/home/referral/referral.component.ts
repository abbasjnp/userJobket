import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('Earn rewards by referring an ideal candidate to us- Jobket');
    this.meta.updateTag({property:'og:url', content:'https://jobket.in/referral'});
    this.meta.updateTag({property:'og:title',content:'Earn rewards by referring an ideal candidate to us- Jobket'});
    this.meta.updateTag({property:'og:description', content:'Jobket is an online platform that offers an exclusive referral program where you get to earn rewards by referring the right candidate for availing the job openings listed'});
    this.meta.updateTag({name:'description', content:'Jobket is an online platform that offers an exclusive referral program where you get to earn rewards by referring the right candidate for availing the job openings listed'});

  }

}
