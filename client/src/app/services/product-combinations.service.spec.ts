import { TestBed } from '@angular/core/testing';

import { ProductCombinationsService } from './product-combinations.service';

describe('ProductCombinationsService', () => {
  let service: ProductCombinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCombinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
