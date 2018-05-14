import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddTagComponent } from './input-add-tag.component';

describe('InputAddTagComponent', () => {
  let component: InputAddTagComponent;
  let fixture: ComponentFixture<InputAddTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAddTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
