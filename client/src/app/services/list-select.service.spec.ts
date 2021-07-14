import { TestBed } from '@angular/core/testing';

import { ListSelectService } from './list-select.service';

describe('ListSelectService', () => {
  let service: ListSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
