import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalJobsComponent } from './international-jobs.component';

describe('InternationalJobsComponent', () => {
  let component: InternationalJobsComponent;
  let fixture: ComponentFixture<InternationalJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
