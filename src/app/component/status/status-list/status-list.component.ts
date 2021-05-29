import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { StatusService } from "../../../service/status.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { StatusModel } from "../../../model/status";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'id', 'name', 'actions'];
  dataSource: MatTableDataSource<StatusModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statusService: StatusService
  ) {
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

}
