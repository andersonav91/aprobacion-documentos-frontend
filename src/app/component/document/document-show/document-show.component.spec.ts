import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentShowComponent } from './document-show.component';

describe('DocumentShowComponent', () => {
  let component: DocumentShowComponent;
  let fixture: ComponentFixture<DocumentShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
