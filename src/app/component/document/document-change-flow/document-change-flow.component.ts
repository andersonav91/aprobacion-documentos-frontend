import { Component, OnInit } from '@angular/core';
import { DocumentModel } from "../../../model/document";
import { DocumentService } from "../../../service/document.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserModel } from "../../../model/user";
import { AuthService } from "../../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../service/user.service";
import { NoticeService } from "../../../service/notice.service";

@Component({
  selector: 'app-document-change-flow',
  templateUrl: './document-change-flow.component.html',
  styleUrls: ['./document-change-flow.component.scss']
})
export class DocumentChangeFlowComponent implements OnInit {

  public currentDocument: DocumentModel;
  public id: number = 0;
  public currentUser: UserModel;
  public userId: number = 0;
  public changeFlowForm: FormGroup;
  public availableUsers: UserModel[] = [];

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private noticeService: NoticeService,
    private userService: UserService
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
      this.userId = user.id;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.documentService.getDocument(this.currentUser.id, this.id).subscribe((data: any[]) => {
        this.currentDocument = Object.assign(new DocumentModel(), data);
      });
      this.userService.getAssignedUsersByDocument(this.id).subscribe((data: any[]) => {
        console.log(data);
      });
    });
  }

  ngOnInit(): void {
    this.changeFlowForm = this.createChangeFlowForm();
  }

  createChangeFlowForm() {
    return this.formBuilder.group({
      observation: ['', Validators.required],
      idUserAssign: ['', [Validators.required]]
    });
  }

  sendChangeFlowForm(): void {
    let data: any = {
      observation: this.changeFlowForm.controls['observation'].value,
      idUserAssign: this.changeFlowForm.controls['idUserAssign'].value,
      idDocument: this.id,
      idUser: this.currentUser.id
    };
    this.documentService.changeDocumentFlow(data).subscribe((data: any[]) => {
      this.noticeService.show("Flujo cambiado correctamente.", "success");
      this.cancelChangeFlowForm();
    });
  }

  get f() {
    return this.changeFlowForm.controls;
  }

  cancelChangeFlowForm() {
    this.router.navigate(['/document']);
  }
}
