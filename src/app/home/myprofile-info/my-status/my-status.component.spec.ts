import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStatusComponent } from './my-status.component';

describe('MyStatusComponent', () => {
  let component: MyStatusComponent;
  let fixture: ComponentFixture<MyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
