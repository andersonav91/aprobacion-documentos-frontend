import { Component, OnInit } from '@angular/core';
import { DocumentService } from "../../../service/document.service";
import { AuthService } from "../../../service/auth.service";
import { UserModel } from "../../../model/user";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DocumentModel } from "../../../model/document";

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.scss']
})
export class DocumentShowComponent implements OnInit {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  currentDocument: DocumentModel;
  currentUser: UserModel;
  id: number = 0;
  observations: string[];

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.documentService.getDocument(this.currentUser.id, this.id).subscribe((data: any[]) => {
        this.currentDocument = Object.assign(new DocumentModel(), data);
        this.observations = this.getObservations(this.currentDocument);
      });
    });
  }

  ngOnInit(): void {
  }

  approveDocument() {}

  denyDocument() {}

  getObservations(document: any) {
    if(! document) {
      return [];
    }
    return document.traceabilities.map((item: any) => { return item.observation; });
  }

}

