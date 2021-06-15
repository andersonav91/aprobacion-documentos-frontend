import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { DocumentModel } from "../../../model/document";
import { DocumentService } from "../../../service/document.service";
import { UserModel } from "../../../model/user";
import { AuthService } from "../../../service/auth.service";
import { DocumentTypeService } from "../../../service/document-type.service";
import { DocumentTypeModel } from "../../../model/document-type";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'id', 'date', 'observation', 'document', 'path', 'actions'];
  dataSource: MatTableDataSource<DocumentModel>;
  @ViewChild(MatPaginator, {read: true}) paginator: MatPaginator;

  currentUser: UserModel;
  totalRows: number = 0;
  documentTypes: DocumentTypeModel[];
  filter: number = 0;
  status: string = 'DP';
  offset: number = 0;
  limit: number = 5;

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private documentTypeService: DocumentTypeService
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
    });
    this.documentTypeService.listDocumentTypes().subscribe((data: any[]) => {
      this.documentTypes = data.map(item => Object.assign(new DocumentTypeModel(), item));
      this.getData();
    });
  }

  ngOnInit(): void {
  }

  getData() {
    this.documentService.listDocuments(this.currentUser.id!, this.offset, this.limit, this.filter, this.status).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(
        data.documents.map((item: any) => Object.assign(new DocumentModel(), item))
      );
      this.totalRows = data.totalItems;
      this.dataSource.paginator = this.paginator;
    });
  }

  pageChanged(event: any){
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.getData();
  }

  setDocumentType(target: any) {
    this.filter = target.value;
    this.getData();
  }

  setDocumentStatus(target: any) {
    this.status = target.value;
    this.getData();
  }

}
