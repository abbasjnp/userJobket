import { Injectable } from '@angular/core';
import { DataService } from './../core/http/data.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
serviceUrl = environment.baseUrl + 'user/';
  serviceUrl1 = environment.baseUrl + 'authentication/';
  constructor(private dataService: DataService) { }


  public fetchLookupList(partialUrl, options, successCall, errorCall) {
    let url = this.serviceUrl1 + partialUrl + '/';
    this.dataService.get(url, options).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall(err);
      }
    );
  }

/*  public fetchLocationList(options, successCall, errorCall) {
    let url = this.serviceUrl1 + 'search-location/';
    this.dataService.get(url, options).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall(err);
      }
    );
  }*/
}
