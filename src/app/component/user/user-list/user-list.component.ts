import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { UserModel } from "../../../model/user";
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'id', 'email', 'name', 'username', 'phone', 'roles', 'actions'];
  dataSource: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService
  ) {
    this.userService.listUsers().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(
        data.map(item => Object.assign(new UserModel(), item))
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {

  }

}
