import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import {UserModel} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class FlowService extends ParentService {

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `POST` request that saves the current flow.
   */
  saveFlow(data: any): any {
    return this.postMethod('flows-states', data);
  }

  /**
   * Constructs a `GET` request that obtain the states for a flow.
   */
  getFlow(documentTypeId: number): any {
    return this.getMethod('flows/' + documentTypeId);
  }


}
