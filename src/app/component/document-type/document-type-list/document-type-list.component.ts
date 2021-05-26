import {Component, OnInit, ViewChild} from '@angular/core';
import { DocumentTypeService } from "../../../service/document-type.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss']
})
export class DocumentTypeListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'id', 'name', 'actions'];
  dataSource: any[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private documentTypeService: DocumentTypeService
  ) {
    this.documentTypeService.listDocumentTypes().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {

  }

}
