import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAsideModalComponent } from './cart-aside-modal.component';

describe('CartAsideModalComponent', () => {
  let component: CartAsideModalComponent;
  let fixture: ComponentFixture<CartAsideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAsideModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAsideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
