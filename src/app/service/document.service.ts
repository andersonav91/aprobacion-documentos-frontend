import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `GET` request that obtains the full list of documents by the user id.
   */
  listDocuments(userId: number, offset: number, limit: number, documentTypeId: number): any {
    return documentTypeId == 0 || documentTypeId === null ?
      this.getMethod('documents/' + userId + '?page=' + (offset / limit) + '&size=' + limit) :
      this.getMethod('documents/' + userId + '?page=' + (offset / limit) + '&size=' + limit + '&documentType=' + documentTypeId);
  }

}
