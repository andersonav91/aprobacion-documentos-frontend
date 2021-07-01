import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeDeleteDialogComponent } from './document-type-delete-dialog.component';

describe('DocumentTypeDeleteDialogComponent', () => {
  let component: DocumentTypeDeleteDialogComponent;
  let fixture: ComponentFixture<DocumentTypeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
