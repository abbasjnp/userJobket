import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkdinLoginComponent } from './linkdin-login.component';

describe('LinkdinLoginComponent', () => {
  let component: LinkdinLoginComponent;
  let fixture: ComponentFixture<LinkdinLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkdinLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkdinLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
