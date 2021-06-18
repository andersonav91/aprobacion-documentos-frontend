import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { DocumentTypeModel } from "../../../model/document-type";

@Component({
  selector: 'app-document-type-form',
  templateUrl: './document-type-form.component.html',
  styleUrls: ['./document-type-form.component.scss']
})
export class DocumentTypeFormComponent implements OnInit {

  public documentTypeForm: FormGroup;

  @Input() isNew: boolean = true;
  @Input() model: any = {};
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() eventModel: Observable<DocumentTypeModel> = new Observable();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.documentTypeForm = this.createDocumentTypeForm();
  }

  ngOnInit(): void {
    this.eventModel.subscribe((documentType: DocumentTypeModel) => {
      if(! this.isNew) {
        delete documentType.id
        this.documentTypeForm.setValue(documentType);
      }
    });
  }

  createDocumentTypeForm() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  sendDocumentTypeForm() {
    if(this.documentTypeForm.valid){
      this.onSubmit.emit(this.documentTypeForm.value);
    }
  }

  cancelDocumentTypeForm() {
    this.onCancel.emit();
  }

  get f() {
    return this.documentTypeForm.controls;
  }

}
