import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class MajordomoInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header.
    const token = sessionStorage.getItem('majordomo-token');
    let authReq;
    if (token && token !== '') {
      authReq = req.clone({ headers: req.headers.set('Authorization', token) });
    } else {
      authReq = req.clone();
    }

    console.log('Sending request with new header now ...');

    // send the newly created request
    return next.handle(authReq)
      .catch((error, caught) => {
        // intercept the respons error and displace it to the console
        console.log('Error Occurred');
        console.log(error);
        console.log(caught);
        // return the error to the method that called it
        return Observable.throw(error);
      }) as any;
  }

}
