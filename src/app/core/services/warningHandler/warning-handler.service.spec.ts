import { TestBed } from '@angular/core/testing';

import { WarningHandlerService } from './warning-handler.service';

describe('WarningHandlerService', () => {
  let service: WarningHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarningHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
