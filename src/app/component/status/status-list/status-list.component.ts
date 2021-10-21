import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { StatusService } from "../../../service/status.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { StatusModel } from "../../../model/status";
import {MatDialog} from "@angular/material/dialog";
import {StatusDeleteDialogComponent} from "../status-delete-dialog/status-delete-dialog.component";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'id', 'name', 'actions'];
  public dataSource: MatTableDataSource<StatusModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statusService: StatusService,
    public dialog: MatDialog
  ) {
    this.refreshList();
    this.statusService.listStatuses().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(
        data.map(item => Object.assign(new StatusModel(), item))
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {

  }

  refreshList(): void {
    this.statusService.listStatuses().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(
        data.map(item => Object.assign(new StatusModel(), item)))
      });
    }

  openDeleteDialog(row: StatusModel): void {
    const dialogRef = this.dialog.open(StatusDeleteDialogComponent, {
      width: '250px',
      data: {row: row}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.refreshList();
      }, 1000);
    });
  }

}
