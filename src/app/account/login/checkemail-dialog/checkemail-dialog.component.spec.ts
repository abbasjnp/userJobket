import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckemailDialogComponent } from './checkemail-dialog.component';

describe('CheckemailDialogComponent', () => {
  let component: CheckemailDialogComponent;
  let fixture: ComponentFixture<CheckemailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckemailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckemailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
