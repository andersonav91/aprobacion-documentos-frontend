import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService,
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `POST` request that consumes the API.
   */
  login(data: object) {
    this.getMethod('user/login').subscribe((data: any) => console.log(data));
  }

}
