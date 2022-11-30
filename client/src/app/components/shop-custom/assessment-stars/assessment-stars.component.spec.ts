import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentStarsComponent } from './assessment-stars.component';

describe('AssessmentStarsComponent', () => {
  let component: AssessmentStarsComponent;
  let fixture: ComponentFixture<AssessmentStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
