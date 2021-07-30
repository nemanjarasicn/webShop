import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscountsListComponent } from './home-discounts-list.component';

describe('HomeDiscountsListComponent', () => {
  let component: HomeDiscountsListComponent;
  let fixture: ComponentFixture<HomeDiscountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
