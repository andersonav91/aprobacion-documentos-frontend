import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DocumentService } from "../../../service/document.service";
import { AuthService } from "../../../service/auth.service";
import { UserModel } from "../../../model/user";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DocumentModel } from "../../../model/document";
import {MatTableDataSource} from "@angular/material/table";
import {DocumentTypeModel} from "../../../model/document-type";
import {NoticeService} from "../../../service/notice.service";

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.scss']
})
export class DocumentShowComponent implements OnInit {

  public documentStatusEnabled: string = 'PROCESO';
  public documentStatusEnded: string = 'FINALIZADO';
  public pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  public currentDocument: DocumentModel;
  public currentUser: UserModel;
  public id: number = 0;
  public userId: number = 0;
  public observations: string[] = [];

  @ViewChild('observation') observation: ElementRef;

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public noticeService: NoticeService
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
      this.userId = user.id;
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

  approveDocument() {
    let data: any = { idUser: this.userId, idDocument: this.id, observation: this.observation.nativeElement.value };
    this.documentService.approveDocument(data).subscribe((data: any[]) => {
      this.noticeService.show("Observación agregada correctamente.", "success");
    });
  }

  denyDocument() {}

  getObservations(document: any): any[] {
    if(! document || (document && ! document.traceabilities)) {
      return [];
    }
    return document.traceabilities.map((item: any) => { return item.observation; });
  }

  isEnded(document: DocumentModel): boolean {
    return document && document.documentState == this.documentStatusEnded ? true : false;
  }

}

