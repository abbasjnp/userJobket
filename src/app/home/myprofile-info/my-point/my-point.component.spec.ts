import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPointComponent } from './my-point.component';

describe('MyPointComponent', () => {
  let component: MyPointComponent;
  let fixture: ComponentFixture<MyPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
