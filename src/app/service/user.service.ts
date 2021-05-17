import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService,
    private jwtHelperService: JwtHelperService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `POST` request that consumes the API.
   */
  login(data: object) {
    this.getMethod('user/login').subscribe((data: any) => console.log(data));
  }

  /**
   * Validates if exists data associated with the user session.
   */
  public isAuthenticated(): boolean {
    const token = this.ls.get('token');
    return false;
    // return !this.jwtHelperService.isTokenExpired(token);
  }

}
