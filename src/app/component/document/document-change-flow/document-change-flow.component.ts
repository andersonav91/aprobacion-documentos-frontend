import { Component, OnInit } from '@angular/core';
import {DocumentModel} from "../../../model/document";
import {DocumentService} from "../../../service/document.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserModel} from "../../../model/user";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-document-change-flow',
  templateUrl: './document-change-flow.component.html',
  styleUrls: ['./document-change-flow.component.scss']
})
export class DocumentChangeFlowComponent implements OnInit {

  public currentDocument: DocumentModel;
  public id: number = 0;
  public currentUser: UserModel;
  public userId: number = 0;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
      this.userId = user.id;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.documentService.getDocument(this.currentUser.id, this.id).subscribe((data: any[]) => {
        this.currentDocument = Object.assign(new DocumentModel(), data);
      });
    });
  }

  ngOnInit(): void {
  }

}
