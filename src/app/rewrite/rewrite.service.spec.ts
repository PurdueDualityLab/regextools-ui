import { TestBed } from '@angular/core/testing';

import { RewriteService } from './rewrite.service';

describe('RewriteService', () => {
  let service: RewriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
