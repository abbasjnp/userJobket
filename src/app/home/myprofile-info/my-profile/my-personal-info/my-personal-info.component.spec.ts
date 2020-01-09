import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPersonalInfoComponent } from './my-personal-info.component';

describe('MyPersonalInfoComponent', () => {
  let component: MyPersonalInfoComponent;
  let fixture: ComponentFixture<MyPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
