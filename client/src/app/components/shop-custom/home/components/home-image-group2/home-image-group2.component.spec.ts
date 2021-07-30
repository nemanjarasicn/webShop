import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImageGroup2Component } from './home-image-group2.component';

describe('HomeImageGroup2Component', () => {
  let component: HomeImageGroup2Component;
  let fixture: ComponentFixture<HomeImageGroup2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeImageGroup2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImageGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
