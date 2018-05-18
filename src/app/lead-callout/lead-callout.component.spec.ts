import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCalloutComponent } from './lead-callout.component';

describe('LeadCalloutComponent', () => {
  let component: LeadCalloutComponent;
  let fixture: ComponentFixture<LeadCalloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadCalloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
