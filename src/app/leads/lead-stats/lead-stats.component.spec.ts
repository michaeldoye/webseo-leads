import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStatsComponent } from './lead-stats.component';

describe('LeadStatsComponent', () => {
  let component: LeadStatsComponent;
  let fixture: ComponentFixture<LeadStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
