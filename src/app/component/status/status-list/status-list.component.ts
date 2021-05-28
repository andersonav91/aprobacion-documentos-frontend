import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { StatusService } from "../../../service/status.service";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'id', 'name', 'actions'];
  dataSource: any[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private statusService: StatusService
  ) {
    this.statusService.listStatuses().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {

  }

}
