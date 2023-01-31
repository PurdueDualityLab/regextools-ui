import { TestBed } from '@angular/core/testing';

import { MoreInfoDialogService } from './more-info-dialog.service';

describe('MoreInfoDialogService', () => {
  let service: MoreInfoDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreInfoDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
