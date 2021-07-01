import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StatusService } from "../../../service/status.service";
import { Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";

@Component({
  selector: 'app-status-delete-dialog',
  templateUrl: './status-delete-dialog.component.html',
  styleUrls: ['./status-delete-dialog.component.scss']
})
export class StatusDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<StatusDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private statusService: StatusService,
    private router: Router,
    public noticeService: NoticeService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  deleteItem() {
    this.statusService.deleteStatus(this.data.row.id).subscribe((data: any[]) => {
      this.router.navigate(['/status']);
      this.noticeService.show("Estado eliminado correctamente.", "success");
    });
    this.dialogRef.close();
  }

}
