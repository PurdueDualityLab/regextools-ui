import { TestBed } from '@angular/core/testing';

import { QueryStoreService } from './query-store.service';

describe('QueryStoreService', () => {
  let service: QueryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
