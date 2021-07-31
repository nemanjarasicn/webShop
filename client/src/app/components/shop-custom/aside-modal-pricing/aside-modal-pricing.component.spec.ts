import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideModalPricingComponent } from './aside-modal-pricing.component';

describe('AsideModalPricingComponent', () => {
  let component: AsideModalPricingComponent;
  let fixture: ComponentFixture<AsideModalPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideModalPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideModalPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
