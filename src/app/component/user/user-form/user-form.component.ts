import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { UserModel } from "../../../model/user";
import { RoleService } from "../../../service/role.service";
import { RoleModel } from "../../../model/role";
import { AuthService } from "../../../service/auth.service";
import { MatchValidator } from "../../../validator/match.validator";
import { StatusService } from "../../../service/status.service";
import { StatusModel } from "../../../model/status";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  public passwordForm: FormGroup;
  public roles: RoleModel[];
  public currentUser: UserModel;

  public tmpForm: FormGroup;

  @Input() isNew: boolean;
  @Input() model: UserModel;
  @Input() eventModel: Observable<UserModel> = new Observable();

  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onPasswordSubmit = new EventEmitter();
  @Output() onPasswordCancel = new EventEmitter();

  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public statusCtrl = new FormControl('');
  public filteredStatuses: Observable<StatusModel[]>;
  public statuses: StatusModel[] = [];
  public allStatuses: StatusModel[] = [];
  public initialStatuses: any[] = [];

  @ViewChild('statusInput') statusInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    public authService: AuthService,
    public statusService: StatusService
  ) {
    this.filteredStatuses = this.statusCtrl.valueChanges.pipe(
      startWith(null),
      map((status: string | null) => status ? this._filter(status) : this.allStatuses.slice()));
  }

  private _filter(value: string): StatusModel[] {
    const filterValue = value.toLowerCase();
    return this.allStatuses.filter(status => status.name.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.statuses.push(this.allStatuses.find((status: StatusModel) => status.name == value));
    }
    event.chipInput!.clear();
    this.statusCtrl.setValue(null);
  }

  addFromStatus(status: any): void {
    const value = (status.name || '').trim();
    if (value) {
      this.statuses.push(this.allStatuses.find((status: StatusModel) => status.name == value));
    }
    this.statusCtrl.setValue(null);
  }

  remove(value: string): void {
    const index = this.statuses.indexOf(this.statuses.find((status: StatusModel) => status.name == value));
    if (index >= 0) {
      this.statuses.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(
      this.statuses.filter((status: StatusModel) =>
        status.name.toLowerCase() == event.option.viewValue.toLowerCase()).length == 0
    ) {
      this.statuses.push(this.allStatuses.find((status: StatusModel) => status.name == event.option.viewValue));
    }
    this.statusInput.nativeElement.value = '';
    this.statusCtrl.setValue(null);
  }

  ngOnInit(): void {

    this.userForm = this.createUserForm();
    this.passwordForm = this.createPasswordForm();
    this.roleService.listRoles().subscribe((data: any[]) => {
      this.roles = data.map(item => Object.assign(new RoleModel(), item));
    });
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
    });

    if(this.isNew) {
      this.statusService.listStatuses().subscribe((statuses: StatusModel[]) => {
        this.allStatuses = statuses;
      });
    }

    this.eventModel.subscribe((user: UserModel) => {

      if(! this.isNew) {
        delete user.id;
        // validate this fields
        user.role = user.usersRoles.length > 0 ? user.usersRoles[0].role.id : null;
        delete user.userRoles;
        delete user.token;
        delete user.usersRoles;
        delete user.currentPassword;
        delete user.passwordRepeat;
        delete user.password;
        this.initialStatuses = user.usersStates;
        delete user.usersStates;
        this.userForm.setValue(user);
      }
      this.model = user;

      this.statusService.listStatuses().subscribe((statuses: StatusModel[]) => {
        this.allStatuses = statuses;
        if(! this.isNew && this.currentUser.hasValidRole(['admin'])) {
          if(this.initialStatuses && this.initialStatuses.length > 0) {
            for (let statusObj of this.initialStatuses) {
              this.addFromStatus(statusObj.state);
            }
          }
        }
      });
    });


    /*if(this.isNew) {
      this.userForm.addControl('password', new FormControl('', Validators.required));
      this.userForm.addControl('passwordRepeat', new FormControl('', Validators.required));
    }*/

    this.userForm.addControl('statuses', this.statusCtrl);

    if(this.currentUser.hasValidRole(['admin'])) {
      this.passwordForm.removeControl('currentPassword');
    }
    
  }

  createUserForm() {
    if(this.isNew) {
      this.tmpForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
        username: ['', Validators.required],
        phone: ['', Validators.required],
        role: ['', Validators.required],
        active: [true, Validators.required],
      });
    } else {
      this.tmpForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        username: ['', Validators.required],
        phone: ['', Validators.required],
        active: [true, Validators.required],
        role: [{value: '', disabled: ! this.isNew}, Validators.required],
      });
    }

    return this.tmpForm;
  }

  createPasswordForm() {
    let tmpForm: FormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      currentPassword: ['', Validators.required]
    }, { validators: MatchValidator('password', 'passwordRepeat') });

    return tmpForm;
  }

  sendUserForm() {
    if(this.userForm.valid){
      this.onSubmit.emit(Object.assign(this.userForm.value, {usersStates:
          ( this.currentUser.hasValidRole(['admin']) ? this.statuses : this.initialStatuses.map(
            (item: any) => Object.assign(new StatusModel(), item.state)
          ))
      }));
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

  changeRole(event:any){
    if(event.target.value == 3){
      this.userForm.addControl('password', new FormControl('', Validators.required));
      this.userForm.addControl('passwordRepeat', new FormControl('', Validators.required));
    }else{
      this.userForm.removeControl('password');
      this.userForm.removeControl('passwordRepeat');
    }
  }
}
