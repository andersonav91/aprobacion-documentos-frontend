import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "../model/user";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ParentService {

  public currentUser: BehaviorSubject<User>;

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
    super(httpClient, noticeService);
    this.currentUser = new BehaviorSubject(new User());
  }

  /**
   * Constructs a `POST` request that consumes the login API.
   */
  login(data: object) {
    this.postMethod('auth', data).subscribe((data: any) => {
      var user = Object.assign(new User(), data);
      this.ls.set('token', user.token);
      this.ls.set('userData', JSON.stringify(user));
      this.setCurrentUser(Object.assign(user));
      this.router.navigate(['']);
    });
  }

  /**
   * Validates if exists data associated with the user session.
   */
  public isAuthenticated(): boolean {
    const token = this.ls.get('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }

  /**
   * Set the current user
   */
  setCurrentUser(currentUser: User) {
    this.currentUser.next(currentUser);
  }

  /**
   * Get the current user from local storage
   */
  getCurrentUserFromStorage() {
    return JSON.parse(this.ls.get("userData"));
  }

}
