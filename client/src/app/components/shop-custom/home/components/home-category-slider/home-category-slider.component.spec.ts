import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategorySliderComponent } from './home-category-slider.component';

describe('HomeCategorySliderComponent', () => {
  let component: HomeCategorySliderComponent;
  let fixture: ComponentFixture<HomeCategorySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCategorySliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategorySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
