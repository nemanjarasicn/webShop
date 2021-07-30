import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImageGroup1Component } from './home-image-group1.component';

describe('HomeImageGroup1Component', () => {
  let component: HomeImageGroup1Component;
  let fixture: ComponentFixture<HomeImageGroup1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeImageGroup1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImageGroup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
