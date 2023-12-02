import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { SellerGuard } from './guard-seller.guard';
import { AccountState } from '../../states/AccountState';

describe('guardSellerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => new SellerGuard(new AccountState(),new Router()).canActivateChild(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
