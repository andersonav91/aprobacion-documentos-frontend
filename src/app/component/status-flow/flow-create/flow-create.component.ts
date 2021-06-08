import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from "../../../service/document-type.service";
import { DocumentTypeModel } from "../../../model/document-type";
import { StatusModel } from "../../../model/status";
import { StatusService } from "../../../service/status.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Router } from "@angular/router";
import { FlowService } from "../../../service/flow.service";
import {NoticeService} from "../../../service/notice.service";

@Component({
  selector: 'app-flow-create',
  templateUrl: './flow-create.component.html',
  styleUrls: ['./flow-create.component.scss']
})
export class FlowCreateComponent implements OnInit {

  documentTypes: DocumentTypeModel[];
  currentDocumentTypeId: number = 0;
  statuses: StatusModel[];

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
    this.statusService.listStatuses().subscribe((data: any[]) => {
      this.statuses = data.map(item => Object.assign(new StatusModel(), item));
    });
  }

  ngOnInit(): void {
  }

  setDocumentType(target: any) {
    this.currentDocumentTypeId = target.value;
  }

  reorderList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
    console.log(this.statuses);
  }

  cancelFlow() {
    this.router.navigate(['']);
  }

  saveFlow() {
    let data: any = Object.assign({listAssignationState: [], documentTypeId: this.currentDocumentTypeId});
    let position = 1;
    for(var state of this.statuses) {
      data.listAssignationState.push({idState: state.id, priority: position});
      position++;
    }

    this.flowService.saveFlow(data)
      .subscribe((response: any) => {
        this.noticeService.show("Flujo creado correctamente.", "success");
        this.cancelFlow();
      });
  }

}
