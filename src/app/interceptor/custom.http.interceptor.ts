import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { LoadingService } from "../service/loading.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  /**
   * Shows the loading indicator in every http request.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.loadingService.hide();
          }
        }, (error) => {
          this.loadingService.hide();
        })
      );
  }
}
