import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";
import { UserModel } from "../../../model/user";
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private noticeService: NoticeService,
  ) { }

  ngOnInit(): void {
  }

  addUser(data: any) {
    console.log(data);

    let user: UserModel = Object.assign(new UserModel(), data);
    user.userRoles = [{id: data.role}];

    this.userService.saveUser(user)
      .subscribe((response: any) => {
        this.noticeService.show("Usuario creado correctamente.", "success");
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate(['/user']);
  }

  changePassword(data: any) {
    console.log('changing password');
  }
}
