import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";
import { DocumentTypeService } from "../../../service/document-type.service";

@Component({
  selector: 'app-document-type-delete-dialog',
  templateUrl: './document-type-delete-dialog.component.html',
  styleUrls: ['./document-type-delete-dialog.component.scss']
})
export class DocumentTypeDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DocumentTypeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentTypeService: DocumentTypeService,
    private router: Router,
    public noticeService: NoticeService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  deleteItem() {
    this.documentTypeService.deleteDocumentType(this.data.row.id).subscribe((data: any[]) => {
      this.router.navigate(['/document-type']);
      this.noticeService.show("Tipo de Documento eliminado correctamente.", "success");
    });
    this.dialogRef.close();
  }

}
