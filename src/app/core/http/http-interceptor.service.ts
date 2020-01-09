import { Injectable,PLATFORM_ID,Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServices } from '../auth/auth.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
const STATE_KEY_PREFIX = 'http_requests:';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  token = localStorage.getItem('token');
  constructor(public auth: AuthServices,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    // const re = '/account/login/auth/linkedin'
    if (this.isNeededToken(request)) {
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }
    const key = makeStateKey<HttpResponse<object>>(STATE_KEY_PREFIX + request.url);
    // console.log(key,"key");   
    // return next.handle(request);
    if (isPlatformBrowser(this.platformId)) {
      // console.log("Platform Browser");
      // Try reusing transferred response from server
      const cachedResponse = this.transferState.get(key, null);
      if (cachedResponse) {
        this.transferState.remove(key); // cached response should be used for the very first time
        return of(new HttpResponse({
          body: cachedResponse.body,
          status: 200,
          statusText: 'OK (from server)',
          // headers are not transferred by current implementation.
        }));
      }
      return next.handle(request);
    }

    if (isPlatformServer(this.platformId)) {
      // console.log("Platform Server");
      // Try saving response to be transferred to browser
      return next.handle(request).pipe(tap(event => {
        if (event instanceof HttpResponse && event.status == 200) {
          // Only body is preserved as it is and it seems sufficient for now. 
          // It would be nice to transfer whole response, but http response is not
          // a POJO and it needs custom serialization/deserialization.
          const response = {
            body: event.body
          };
          this.transferState.set(key, response);
        }
      }));
    }
  
  }
  isNeededToken(request) {
    if(localStorage.getItem('token')==null)
      return false;
    if(localStorage.getItem('set')){
      return false;
    }  
    if(localStorage.length==0){
       return false;
     }
     const isLoggedIn = localStorage.getItem('loggedIn');
     if(isLoggedIn){
         localStorage.removeItem('linkedIntoken');
         return true;
     }
     if(localStorage.getItem('linkedIntoken')){
       return false;
     }
    
    const token = JSON.parse(localStorage.getItem('token'));
   
    if (
      request.url &&
      (request.url.indexOf('/login') > 0 || request.url.indexOf('/reset') > 0 ||
       request.url.indexOf('/email-verification') > 0 ||
       request.url.indexOf('/registration') > 0 || request.url.indexOf('/forget-password') > 0
      )
    ) {
      return false;
    }
    if (!(isLoggedIn && token && token.access_token) && request.url.indexOf('/authentication') > 0) {
      return false;
    }
    return true;
  }
}
// request.url.indexOf('/signup') > 0 || request.url.indexOf('/forget-password') 