import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDeleteDialogComponent } from './status-delete-dialog.component';

describe('StatusDeleteDialogComponent', () => {
  let component: StatusDeleteDialogComponent;
  let fixture: ComponentFixture<StatusDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
