import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DocumentTypeService } from "../../../service/document-type.service";
import { DocumentTypeModel } from "../../../model/document-type";
import {NoticeService} from "../../../service/notice.service";

@Component({
  selector: 'app-document-type-new',
  templateUrl: './document-type-new.component.html',
  styleUrls: ['./document-type-new.component.scss']
})
export class DocumentTypeNewComponent implements OnInit {

  model: DocumentTypeModel = new DocumentTypeModel();

  constructor(
    private router: Router,
    private documentTypeService: DocumentTypeService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit(): void {
  }

  addDocumentType(data: any) {
    let documentType: DocumentTypeModel = Object.assign(new DocumentTypeModel(), data);
    /*this.documentTypeService.saveDocumentType(documentType)
      .subscribe((response: any) => {
        this.noticeService.show("Tipo de Documento creado correctamente.", "success");
        this.cancel();
    });*/
    this.noticeService.show("Tipo de Documento creado correctamente.", "success");
  }

  cancel() {
    this.router.navigate(['/document-type']);
  }
}
