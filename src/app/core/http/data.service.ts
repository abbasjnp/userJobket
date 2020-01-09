import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';

import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getJsonFile(url, data) {
    return this.http.get(url);
  }

  get(url, options?) {
    if (!options) {
      options = {};
    }
    return this.http.get(url, options).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getTypeData<T>(url, options?) {
    if (!options) {
      options = {};
    }
    return this.http.get<T>(url, options).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  delete(url) {
    return this.http.delete(url).pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  // postNew(url, data) {
  //   console.log(data,"dataaa"," ",url,"url");

  //    this.http.post(url, data).subscribe(
  //      res=>console.log(res,"rddd")
  //    )
  // }

  post(url, data) {
    return this.http.post(url, data).pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  put(url, data) {
    return this.http.put(url, data).pipe(
      retry(0), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  // uploadFile(url, data, isUpdate: any) {
  //   const req = new HttpRequest('POST', url, data, {
  //     reportProgress: true
  //   });
  //   return this.http.request(req);
  // }

  uploadFile(url, formData, isUpdate: any) {
    const req = new HttpRequest('POST', url, formData, {
       reportProgress: true
    });
    return this.http.request(req);
  }

  uploadResumeFile(url, formData, isUpdate: any) {
    const req = new HttpRequest('PUT', url, formData, {
      // reportProgress: true
    });
    return this.http.request(req);
  }

  // uploadFile(url, file: any, isUpdate: any) {
  //   const formData: FormData = new FormData();
  //   if (file) {
  //     formData.append('file', file);
  //   }
  //   const req = new HttpRequest('POST', url, formData, {
  //     reportProgress: true
  //   });
  //   return this.http.request(req);
  // }

  multipartRequest(url, formData: any) {
    const req = new HttpRequest('POST', url, formData, {
      // reportProgress: true
    });
    req.headers.append('Content-Type', 'multipart/form-data');
    return this.http.request(req);
  }

  uploadEmployeeFile(url, method, formData: any) {
    const req = new HttpRequest(method, url, formData, {
      reportProgress: true
    });
    req.headers.append('Content-Type', 'multipart/form-data');
    return this.http.request(req);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof HttpErrorResponse) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    if (error.error && error.error.message) {
      return throwError(error.error.message);
    } else {
      return throwError('Something bad happened; please try again later.');
    }

  }
}
