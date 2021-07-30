import { TestBed } from '@angular/core/testing';

import { CartAsideProductService } from './cart-aside-product.service';

describe('CartAsideProductService', () => {
  let service: CartAsideProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartAsideProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
