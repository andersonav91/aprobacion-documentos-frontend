import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";
import { UserModel } from "../../../model/user";
import { UserService } from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public model: UserModel = new UserModel();
  public eventSubject: Subject<UserModel> = new Subject<UserModel>();
  private id: number = 0;
  currentUser: UserModel;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private noticeService: NoticeService,
    private authService: AuthService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      this.userService.getUser(this.id).subscribe((data: any) => {
        this.model = Object.assign(new UserModel(), data);
        this.emitModel();
      });
    });

    this.currentUser = Object.assign(new UserModel(), this.authService.getCurrentUserFromStorage());
  }

  ngOnInit(): void {
    if(! this.currentUser.hasValidRole(['admin']) && this.id !== this.currentUser.id) {
      this.router.navigate(['']);
      this.noticeService.show("No tiene permisos para realizar esta acción.", "error");
    }
  }

  emitModel() {
    this.eventSubject.next(this.model);
  }

  editUser(data: any) {
    this.model = Object.assign(new UserModel(), data);
    this.model.id = this.id;
    this.userService.editUser(this.model)
      .subscribe((response: any) => {
        this.noticeService.show("Usuario editado correctamente.", "success");
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate(['/user']);
  }

  changepassword(data: any) {
    let formData = {'newPassword': data.password, 'oldPassword': data.currentPassword};
    this.userService.changePassword(this.id, formData).subscribe((response: any) => {
      this.noticeService.show("Contraseña cambiada correctamente.", "success");
      this.cancel();
    });
  }

}
