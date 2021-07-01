import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { DocumentTypeModel } from "../model/document-type";

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
  listDocumentTypes(): any {
    return this.getMethod('document-types')
  }

  /**
   * Constructs a `POST` request that saves a document type.
   */
  saveDocumentType(data: DocumentTypeModel): any {
    return this.postMethod('document-types', data);
  }

  /**
   * Constructs a `GET` request that obtain the data for a document type.
   */
  getDocumentType(id: number): any {
    return this.getMethod('document-types/' + id);
  }

  /**
   * Constructs a `PUT` request that edits a document type.
   */
  editDocumentType(data: DocumentTypeModel): any {
    return this.putMethod('document-types/' + data.id, data);
  }

  /**
   * Constructs a `DELETE` request that deletes a document type by the id.
   */
  deleteDocumentType(id: number): any {
    return this.deleteMethod('document-types/' + id)
  }

}
