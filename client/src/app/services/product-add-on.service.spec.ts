import { TestBed } from '@angular/core/testing';

import { ProductAddOnService } from './product-add-on.service';

describe('ProductAddOnService', () => {
  let service: ProductAddOnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAddOnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
