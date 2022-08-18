import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from "../../../service/document.service";
import { AuthService } from "../../../service/auth.service";
import { UserModel } from "../../../model/user";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { DocumentModel } from "../../../model/document";
import { NoticeService } from "../../../service/notice.service";
import { environment } from "../../../../environments/environment";
import { FlowModel } from 'src/app/model/flow';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.scss']
})
export class DocumentShowComponent implements OnInit {

  public documentStatusEnabled: string = 'PROCESO';
  public documentStatusEnded: string = 'FINALIZADO';
  public documentStatusRejected: string = 'RECHAZADO';
  public status: string = 'AP';
  public currentDocument: DocumentModel;
  public currentUser: UserModel;
  public id: number = 0;
  public userId: number = 0;
  public userApproverId: number = 0;
  public observations: string[] = [];
  public pdfViewerUrl: string = environment.apiEndpointProtocol + "://" +
    environment.apiEndpointUrl + 'documents/view-documents/';
  public priorityStatus: number = 0;
  public assignedUser: UserModel;
  public users: UserModel[];

  @ViewChild('observation') observation: ElementRef;

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public noticeService: NoticeService,
    private router: Router,
    private userService: UserService
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
      this.userId = user.id;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.pdfViewerUrl = this.pdfViewerUrl + this.id.toString();
      this.documentService.getDocument(this.currentUser.id, this.id).subscribe((data: any[]) => {
        this.currentDocument = Object.assign(new DocumentModel(), data);
        this.assignedUser = this.currentDocument.user;
        this.observations = this.getObservations(this.currentDocument);
        this.validateStatus(this.currentDocument);
      });
    });

    this.userService.getUsersApprovers().subscribe((data: any[]) => {
      this.users = data.map(user => Object.assign(new UserModel(), user));
    });
  }

    validateStatus(currentDocument: DocumentModel){
    var idStatus = currentDocument.traceabilities.reduce((item, curr) => {
      return item.id < curr.id ? curr : item;
    }).state.id;
    var flowState = currentDocument.flow.flowStates.filter(flowState => flowState.state.id == idStatus).map(flowState => flowState)[0];
    this.priorityStatus = flowState.priority;
  }

  ngOnInit(): void {
  }

  approveDocument() {
    let data:any;
    if(this.userApproverId != 0){
      data = { idUser: this.userId, idDocument: this.id, observation: this.observation.nativeElement.value, action: 'AP', idUserApprover:this.userApproverId};  
    } else {
      data = { idUser: this.userId, idDocument: this.id, observation: this.observation.nativeElement.value, action: 'AP'};
    }
    this.documentService.approveDocument(data).subscribe((data: any[]) => {
      this.noticeService.show("Documento aprobado correctamente.", "success");
      this.router.navigate(['/document']);
    });
  }

  denyDocument() {
    let data: any = { idUser: this.userId, idDocument: this.id, observation: this.observation.nativeElement.value, action: 'DR'};
    this.documentService.approveDocument(data).subscribe((data: any[]) => {
      this.noticeService.show("Documento rechazado correctamente.", "success");
      this.router.navigate(['/document']);
    });
  }

  returnDocument() {
    let data: any = { idUser: this.userId, idDocument: this.id, observation: this.observation.nativeElement.value, action: 'DV'};
    this.documentService.approveDocument(data).subscribe((data: any[]) => {
      this.noticeService.show("Documento devuelto correctamente.", "success");
      this.router.navigate(['/document']);
    });
  }

  getObservations(document: any): any[] {
    if(! document || (document && ! document.traceabilities)) {
      return [];
    }
    return document.traceabilities.map((item: any) => { return item.observation; });
  }

  isEnded(document: DocumentModel): boolean {
    return document && (document.documentState == this.documentStatusEnded || document.documentState == this.documentStatusRejected) ? true : false;
  }

  setStatus(target: any) {
    this.status = target.value;
  }

  setUserApprover(target:any){
    this.userApproverId = target.value;
  }

  manageDocument() {
    let observation: string = this.observation.nativeElement.value;
    if(! observation || observation == '' || observation == null || observation == undefined) {
      this.noticeService.show('El Campo observación es requerido.', 'error');
    } else {
      switch (this.status) {
        case 'AP':
          this.approveDocument();
          break;
        case 'DR':
          this.denyDocument();
          break;
        case 'DV':
          this.returnDocument();
          break;
      }
    }

  }

  cancel() {
    this.router.navigate(['/document']);
  }

}

