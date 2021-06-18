import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from "../../../service/document-type.service";
import { DocumentTypeModel } from "../../../model/document-type";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subject } from "rxjs";
import { NoticeService } from "../../../service/notice.service";

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.scss']
})
export class DocumentTypeEditComponent implements OnInit {

  public model: DocumentTypeModel = new DocumentTypeModel();
  public eventSubject: Subject<DocumentTypeModel> = new Subject<DocumentTypeModel>();
  private id: number = 0;

  constructor(
    private documentTypeService: DocumentTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private noticeService: NoticeService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.documentTypeService.getDocumentType(this.id).subscribe((data: any) => {
        this.model = Object.assign(new DocumentTypeModel(), data);
        this.emitModel();
      });
    })

  }

  ngOnInit(): void {
  }

  emitModel() {
    this.eventSubject.next(this.model);
  }

  editDocumentType(data: any) {
    this.model = Object.assign(new DocumentTypeModel(), data);
    this.model.id = this.id;
    this.documentTypeService.editDocumentType(this.model)
      .subscribe((response: any) => {
        this.noticeService.show("Tipo de Documento editado correctamente.", "success");
        this.cancel();
    });
  }

  cancel() {
    this.router.navigate(['/document-type']);
  }

}
