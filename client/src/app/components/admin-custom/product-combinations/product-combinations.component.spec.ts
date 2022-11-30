import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCombinationsComponent } from './product-combinations.component';

describe('ProductCombinationsComponent', () => {
  let component: ProductCombinationsComponent;
  let fixture: ComponentFixture<ProductCombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCombinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
