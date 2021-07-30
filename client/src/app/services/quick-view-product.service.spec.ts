import { TestBed } from '@angular/core/testing';

import { QuickViewProductService } from './quick-view-product.service';

describe('QuickViewProductService', () => {
  let service: QuickViewProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickViewProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
