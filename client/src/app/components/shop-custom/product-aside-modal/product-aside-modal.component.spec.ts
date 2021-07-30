import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAsideModalComponent } from './product-aside-modal.component';

describe('ProductAsideModalComponent', () => {
  let component: ProductAsideModalComponent;
  let fixture: ComponentFixture<ProductAsideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAsideModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAsideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
