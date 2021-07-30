import { TestBed } from '@angular/core/testing';

import { WishlistAsideModalService } from './wishlist-aside-modal.service';

describe('WishlistAsideModalService', () => {
  let service: WishlistAsideModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistAsideModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
