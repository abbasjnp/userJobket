import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferNowComponent } from './refer-now.component';

describe('ReferNowComponent', () => {
  let component: ReferNowComponent;
  let fixture: ComponentFixture<ReferNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
