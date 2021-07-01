import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentTypeService } from "../../../service/document-type.service";
import { MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentTypeModel } from "../../../model/document-type";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DocumentTypeDeleteDialogComponent } from "../document-type-delete-dialog/document-type-delete-dialog.component";

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
    private documentTypeService: DocumentTypeService,
    public dialog: MatDialog
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

  openDeleteDialog(row: DocumentTypeModel): void {
    const dialogRef = this.dialog.open(DocumentTypeDeleteDialogComponent, {
      width: '250px',
      data: {row: row}
    });
  }

}
