import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalStatusComponent } from './referal-status.component';

describe('ReferalStatusComponent', () => {
  let component: ReferalStatusComponent;
  let fixture: ComponentFixture<ReferalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
