import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupdoneDialogComponent } from './signupdone-dialog.component';

describe('SignupdoneDialogComponent', () => {
  let component: SignupdoneDialogComponent;
  let fixture: ComponentFixture<SignupdoneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupdoneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupdoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
