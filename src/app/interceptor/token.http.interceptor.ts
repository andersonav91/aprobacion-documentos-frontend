import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as SecureLS from 'secure-ls';

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {

  constructor() { }

  /**
   * Add Token to headers if it exists.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let ls = new SecureLS({});
    // Clone the request to add the new header
    var clonedRequest = null;
    if(ls.getAllKeys().indexOf('token') != -1){
      clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + ls.get('token')) });
    } else {
      clonedRequest = req.clone();
    }

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
