import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from "../../../service/document-type.service";
import { DocumentTypeModel } from "../../../model/document-type";
import { StatusModel } from "../../../model/status";
import { StatusService } from "../../../service/status.service";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Router } from "@angular/router";
import { FlowService } from "../../../service/flow.service";
import { NoticeService } from "../../../service/notice.service";

@Component({
  selector: 'app-flow-create',
  templateUrl: './flow-create.component.html',
  styleUrls: ['./flow-create.component.scss']
})
export class FlowCreateComponent implements OnInit {

  public documentTypes: DocumentTypeModel[];
  public currentDocumentTypeId: number = 0;
  public statuses: StatusModel[];
  public pendingStatuses: StatusModel[] = [];

  constructor(
    private documentTypeService: DocumentTypeService,
    private statusService: StatusService,
    private flowService: FlowService,
    private router: Router,
    public noticeService: NoticeService
  ) {
    this.documentTypeService.listDocumentTypes().subscribe((data: any[]) => {
      this.documentTypes = data.map(item => Object.assign(new DocumentTypeModel(), item));
    });
    this.getAllStatuses();
  }

  ngOnInit(): void {
  }

  setDocumentType(target: any) {
    this.currentDocumentTypeId = target.value;
    if(this.currentDocumentTypeId && this.currentDocumentTypeId != 0) {
      this.flowService.getFlow(this.currentDocumentTypeId).subscribe((data: any) => {
        this.statuses = data ? data.flowStates.map((item: any) => Object.assign(new StatusModel(), item.state)) : [];
        this.statusService.listPendingStatuses(this.currentDocumentTypeId).subscribe((data: any[]) => {
          this.pendingStatuses = data.map((item: any) => Object.assign(new StatusModel(), item));
        });
      });
    }
     else {
      this.getAllStatuses();
    }

  }

  getAllStatuses() {
    this.statusService.listStatuses().subscribe((data: any[]) => {
      this.statuses = data.map(item => Object.assign(new StatusModel(), item));
    });
  }

  reorderList(event: CdkDragDrop<StatusModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  cancelFlow() {
    this.router.navigate(['']);
  }

  saveFlow() {
    if(! this.currentDocumentTypeId || this.currentDocumentTypeId == 0) {
      return;
    }
    let data: any = Object.assign({listAssignationState: [], documentTypeId: this.currentDocumentTypeId});
    let position = 1;
    for(var state of this.statuses) {
      data.listAssignationState.push({idState: state.id, priority: position});
      position++;
    }

    this.flowService.saveFlow(data)
      .subscribe((response: any) => {
        this.noticeService.show("Flujo creado correctamente.", "success");
      });
  }

}
