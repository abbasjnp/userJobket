import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private title:Title, private meta:Meta) { }

  ngOnInit() {
    this.title.setTitle('Recruiting FAQs - Frequently Asked Questions - FAQs refer a jobs');
    this.meta.updateTag({property:'og:url', content:'https://jobket.in/faq'});
    this.meta.updateTag({property:'og:title',content:'Recruiting FAQs - Frequently Asked Questions - FAQs refer a jobs'});
    this.meta.updateTag({property:'og:description', content:'Answering your questions find a job opening, refer a job, get the reward, jobs I applied status'});
    this.meta.updateTag({name:'description', content:'Answering your questions find a job opening, refer a job, get the reward, jobs I applied status'});

  }

}
