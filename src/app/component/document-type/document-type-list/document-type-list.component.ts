import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentTypeService } from "../../../service/document-type.service";
import { MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentTypeModel } from "../../../model/document-type";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss']
})
export class DocumentTypeListComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'id', 'name', 'actions'];
  public dataSource: MatTableDataSource<DocumentTypeModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private documentTypeService: DocumentTypeService
  ) {
    this.documentTypeService.listDocumentTypes().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(
        data.map(item => Object.assign(new DocumentTypeModel(), item))
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {

  }

}
