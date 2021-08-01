import { TestBed } from '@angular/core/testing';

import { AccountAsideModalService } from './account-aside-modal.service';

describe('AccountAsideModalService', () => {
  let service: AccountAsideModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountAsideModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
