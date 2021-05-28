import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";
import { StatusService } from "../../../service/status.service";
import { StatusModel } from "../../../model/status";

@Component({
  selector: 'app-status-new',
  templateUrl: './status-new.component.html',
  styleUrls: ['./status-new.component.scss']
})
export class StatusNewComponent implements OnInit {

  constructor(
    private router: Router,
    private statusService: StatusService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit(): void {
  }

  addStatus(data: any) {
    let status: StatusModel = Object.assign(new StatusModel(), data);
    this.statusService.saveStatus(status)
      .subscribe((response: any) => {
        this.noticeService.show("Estado creado correctamente.", "success");
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate(['/status']);
  }

}
