import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { StatusModel } from "../model/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `GET` request that obtains the full list of statuses.
   */
  listStatuses(): any {
    return this.getMethod('states')
  }

  /**
   * Constructs a `POST` request that saves a status.
   */
  saveStatus(data: StatusModel): any {
    return this.postMethod('states', data);
  }

  /**
   * Constructs a `GET` request that obtain the data for a status.
   */
  getStatus(id: number): any {
    return this.getMethod('states/' + id);
  }

  /**
   * Constructs a `PUT` request that edits a status.
   */
  editStatus(data: StatusModel): any {
    return this.putMethod('states/' + data.id, data);
  }

  /**
   * Constructs a `GET` request that obtains the full list of statuses pending in a document flow.
   */
  listPendingStatuses(idDocumentType: number): any {
    return this.getMethod('documents/' + idDocumentType + '/states')
  }

}
