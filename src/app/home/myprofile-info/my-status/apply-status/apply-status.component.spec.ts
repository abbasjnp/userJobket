import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyStatusComponent } from './apply-status.component';

describe('ApplyStatusComponent', () => {
  let component: ApplyStatusComponent;
  let fixture: ComponentFixture<ApplyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
