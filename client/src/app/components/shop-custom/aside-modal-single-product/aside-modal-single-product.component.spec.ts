import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideModalSingleProductComponent } from './aside-modal-single-product.component';

describe('AsideModalSingleProductComponent', () => {
  let component: AsideModalSingleProductComponent;
  let fixture: ComponentFixture<AsideModalSingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideModalSingleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideModalSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
