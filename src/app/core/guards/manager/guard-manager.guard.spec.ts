import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { ManagerGuard } from './guard-manager.guard';
import { AccountState } from '../../states/AccountState';

describe('guardAdministradorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => new ManagerGuard(new AccountState(),new Router()).canActivateChild(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
