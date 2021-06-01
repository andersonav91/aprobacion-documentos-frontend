import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import {DocumentTypeModel} from "../model/document-type";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `GET` request that obtains the full list of roles.
   */
  listRoles(): any {
    return this.getMethod('roles')
  }

}
