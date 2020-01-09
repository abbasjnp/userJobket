import { Component, OnInit,PLATFORM_ID,Inject } from '@angular/core';
import { Router} from '@angular/router';
import { isPlatformBrowser} from '@angular/common';
import * as $ from 'jquery';
import {environment} from './../../../environments/environment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
// BaseUrl="https://jobket.in/";

BaseUrl=environment.footerUrl;
// BaseUrl='http://localhost:4200/';

testBrowser: boolean;
panelOpenState = false;

searchJobs =[
  {loc:'Bangalore',index:0},
  {loc:'Delhi',index:1},
  {loc:'Mumbai',index:2},
  {loc:'Gurgaon',index:3},
  {loc:'Noida',index:4},
  {loc:'Noida',index:5},
  {loc:'Japan',index:6},
]
category =[
  {name:'Software Engineering',index:0},
  {name:'Marketing',index:1},
  {name:'Sales',index:2},
  {name:'Creative',index:3},
  {name:'Business',index:4},
  {name:'H R',index:5},
  {name:'Other',index:6},

]
subCategory =[
  {name:'Software Engineering',index:0},
  {name:'Marketing',index:1},
  {name:'Sales',index:2},
  {name:'Creative',index:3},
  {name:'Business',index:4},
  {name:'H R',index:5},
  {name:'Other',index:6},
]

  constructor(private rout: Router,@Inject(PLATFORM_ID) platformId: string){ 
    this.testBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(){
   
 
  }
}
