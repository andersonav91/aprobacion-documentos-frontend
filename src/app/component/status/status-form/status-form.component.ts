import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { StatusModel } from "../../../model/status";

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {

  public statusForm: FormGroup;

  @Input() isNew: boolean = true;
  @Input() model: any = {};
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() eventModel: Observable<StatusModel> = new Observable();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.statusForm = this.createStatusForm();
  }

  ngOnInit(): void {
    this.eventModel.subscribe((status: StatusModel) => {
      if(! this.isNew) {
        delete status.id;
        this.statusForm.setValue(status);
      }
    });
  }

  createStatusForm() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  sendStatusForm() {
    if(this.statusForm.valid){
      this.onSubmit.emit(this.statusForm.value);
    }
  }

  cancelStatusForm() {
    this.onCancel.emit();
  }

  get f() {
    return this.statusForm.controls;
  }

}
