import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentChangeFlowComponent } from './document-change-flow.component';

describe('DocumentChangeFlowComponent', () => {
  let component: DocumentChangeFlowComponent;
  let fixture: ComponentFixture<DocumentChangeFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentChangeFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentChangeFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
