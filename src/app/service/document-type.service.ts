import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `GET` request that obtains the full list of document types.
   */
  list(): any {
    return this.getMethod('document-types')
  }

}
