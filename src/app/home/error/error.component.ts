import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens'
import { Response } from 'express'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  private response: Response;
  constructor(private location:Location, private meta:Meta,@Optional() @Optional() @Inject(RESPONSE) response: any ) {
    this.response = response;
   }
 
  ngOnInit() {
    this.meta.updateTag({property:'og:url', content:'https://jobket.in/404'});
    // console.log('here with response', this.response);
    if (this.response) {
      // response will only be if we have express
      // this.response.statusCode = 404;
      this.response.status(404);
      // this.response.statusMessage('404 - Page Not Found');
    }
  }
  goBack(){
    this.location.back();
  }

}
