import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";
import { StatusModel } from "../../../model/status";
import { StatusService } from "../../../service/status.service";

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.scss']
})
export class StatusEditComponent implements OnInit {

  public model: StatusModel = new StatusModel();
  public eventSubject: Subject<StatusModel> = new Subject<StatusModel>();
  private id: number = 0;

  constructor(
    private statusService: StatusService,
    private route: ActivatedRoute,
    private router: Router,
    private noticeService: NoticeService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.statusService.getStatus(this.id).subscribe((data: any) => {
        this.model = Object.assign(new StatusModel(), data);
        this.emitModel();
      });
    })

  }

  ngOnInit(): void {
  }

  emitModel() {
    this.eventSubject.next(this.model);
  }

  editStatus(data: any) {
    this.model = Object.assign(new StatusModel(), data);
    this.model.id = this.id;
    this.statusService.editStatus(this.model)
      .subscribe((response: any) => {
        this.noticeService.show("Estado editado correctamente.", "success");
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate(['/status']);
  }

}
