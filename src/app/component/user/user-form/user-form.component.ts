import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { UserModel } from "../../../model/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  @Input() isNew: boolean = true;
  @Input() model: any = {};
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() eventModel: Observable<UserModel> = new Observable();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.createUserForm();
  }

  ngOnInit(): void {
    this.eventModel.subscribe((user: UserModel) => {
      if(! this.isNew) {
        delete user.id;
        // validate this fields
        delete user.usersRoles;
        delete user.token;
        this.userForm.setValue(user);
      }
    });
  }

  createUserForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
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

}
