import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileInfoComponent } from './myprofile-info.component';

describe('MyprofileInfoComponent', () => {
  let component: MyprofileInfoComponent;
  let fixture: ComponentFixture<MyprofileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
