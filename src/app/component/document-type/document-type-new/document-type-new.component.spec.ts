import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeNewComponent } from './document-type-new.component';

describe('DocumentTypeNewComponent', () => {
  let component: DocumentTypeNewComponent;
  let fixture: ComponentFixture<DocumentTypeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
