import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {NoticeService} from "./notice.service";
import * as SecureLS from 'secure-ls'



export class ParentService {

  private apiEndpointUrl: string = environment.apiEndpointProtocol + "://" +
    environment.apiEndpointUrl;

  protected ls = new SecureLS({});

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) { }

  /**
   * Constructs a `GET` request that consumes the API.
   */
  protected getMethod(path: string, options?: object) {
    return this.httpClient.get(this.apiEndpointUrl + path, options).pipe(catchError(error => this.handleError(error,this.noticeService)));
  }

  /**
   * Constructs a `POST` request that consumes the API.
   */
  protected postMethod(path: string, body: any | null, options?: object) {
    return this.httpClient.post(this.apiEndpointUrl + path, body, options).pipe(catchError(error => this.handleError(error,this.noticeService)));
  }

  /**
   * Catch the error message from HttpService and display it as a notice message.
   */
  protected handleError(error: HttpErrorResponse, noticeService: NoticeService) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.noticeService.show(errorMessage, 'error');
    return throwError(errorMessage);
  }

}
