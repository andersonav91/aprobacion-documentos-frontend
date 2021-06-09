import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from "../model/user";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { SidebarService } from "./sidebar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ParentService {

  public currentUser: BehaviorSubject<UserModel>;

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private sidebarService: SidebarService,
  ) {
    super(httpClient, noticeService);
    this.currentUser = new BehaviorSubject(new UserModel());
  }

  /**
   * Constructs a `POST` request that consumes the login API.
   */
  login(data: object) {
    this.postMethod('auth', data, {}).subscribe((data: any) => {
      var user: UserModel = Object.assign(new UserModel(), data);
      user.userRoles = user.usersRoles;
      this.ls.set('token', user.token);
      this.ls.set('userData', JSON.stringify(user));
      this.setCurrentUser(Object.assign(user));
      this.router.navigate(['']);
      this.sidebarService.show();
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
  setCurrentUser(currentUser: UserModel) {
    this.currentUser.next(currentUser);
  }

  /**
   * Get the current user from local storage
   */
  getCurrentUserFromStorage() {
    return this.ls.get("userData") != '' ? JSON.parse(this.ls.get("userData")) : null;
  }

  /**
   * Logout the user from the app
   */
  logout() {
    this.ls.remove("token");
    this.ls.remove("userData");
    this.setCurrentUser(new UserModel());
    this.router.navigate(['/login'])
  }

}
