import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSingleProductComponent } from './list-single-product.component';

describe('ListSingleProductComponent', () => {
  let component: ListSingleProductComponent;
  let fixture: ComponentFixture<ListSingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSingleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
