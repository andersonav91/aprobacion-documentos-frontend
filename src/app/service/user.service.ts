import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { UserModel } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `GET` request that obtains the full list of users.
   */
  listUsers(): any {
    return this.getMethod('users')
  }

  /**
   * Constructs a `POST` request that saves a user.
   */
  saveUser(data: UserModel): any {
    return this.postMethod('users', data);
  }

  /**
   * Constructs a `GET` request that obtain the data for a user.
   */
  getUser(id: number): any {
    return this.getMethod('users/' + id);
  }

  /**
   * Constructs a `PUT` request that edits a user.
   */
  editUser(data: UserModel): any {
    return this.putMethod('users/' + data.id, data);
  }

  /**
   * Constructs a `PUT` request that changes the user password.
   */
  changePassword(id: number, data: any): any {
    return this.putMethod('users/change-password/' + id, data);
  }

}
