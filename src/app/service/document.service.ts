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
  listDocuments(userId: number, offset: number, limit: number, documentTypeId: number, documentState: string): any {
    return documentTypeId == 0 || documentTypeId === null ?
      this.getMethod('documents/' + userId + '?page=' + (offset / limit) + '&size=' + limit + '&state=' + documentState) :
      this.getMethod('documents/' + userId + '?page=' + (offset / limit) + '&size=' + limit + '&documentType=' + documentTypeId + '&state=' + documentState);
  }

  /**
   * Constructs a `GET` request that obtains an specific document by the id and the user id.
   */
  getDocument(userId: number, documentId: number): any {
    return this.getMethod('documents/' + userId + '/' + documentId);
  }

  /**
   * Constructs a `POST` request that change the status of a document and adds a comment to it.
   */
  approveDocument(documentData: any): any {
    return this.postMethod('documents/manage-documents/', documentData);
  }

}
