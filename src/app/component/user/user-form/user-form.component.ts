import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import { UserModel } from "../../../model/user";
import { RoleService } from "../../../service/role.service";
import { RoleModel } from "../../../model/role";
import {AuthService} from "../../../service/auth.service";
import {ErrorStateMatcher} from "../../../util/error.state.matcher";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  public passwordForm: FormGroup;
  public roles: RoleModel[];

  @Input() isNew: boolean = true;
  @Input() model: any = {};
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() eventModel: Observable<UserModel> = new Observable();

  @Output() onPasswordSubmit = new EventEmitter();
  @Output() onPasswordCancel = new EventEmitter();

  matcher = new ErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    public authService: AuthService,
  ) {
    this.userForm = this.createUserForm();
    this.passwordForm = this.createPasswordForm();
    this.roleService.listRoles().subscribe((data: any[]) => {
      this.roles = data.map(item => Object.assign(new RoleModel(), item));
    });

  }

  ngOnInit(): void {
    this.eventModel.subscribe((user: UserModel) => {
      if(! this.isNew) {
        delete user.id;
        // validate this fields
        delete user.usersRoles;
        delete user.token;
        user.passwordRepeat = '';
        user.password = '';
        delete user.currentPassword;
        this.userForm.setValue(user);
      }
    });

  }

  createUserForm() {
    let tmpForm: FormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
    });

    if(this.isNew) {
      tmpForm.addControl('password', new FormControl('', Validators.required));
      tmpForm.addControl('passwordRepeat', new FormControl('', Validators.required));
    }

    return tmpForm;
  }

  createPasswordForm() {
    let tmpForm: FormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      currentPassword: ['', Validators.required]
    }, { validators: this.checkPasswords });

    return tmpForm;
  }

  sendUserForm() {
    if(this.userForm.valid){
      this.onSubmit.emit(this.userForm.value);
    }
  }

  cancelUserForm() {
    this.onCancel.emit();
  }

  get f() {
    return this.userForm.controls;
  }

  get fp() {
    return this.passwordForm.controls;
  }

  sendPasswordForm() {
    if(this.passwordForm.valid){
      this.onPasswordSubmit.emit(this.passwordForm.value);
    }
  }

  cancelPasswordForm() {
    this.onPasswordCancel.emit();
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const passwordRepeat = group.get('passwordRepeat').value;

    return password === passwordRepeat ? null : { notSame: true }
  }

}
