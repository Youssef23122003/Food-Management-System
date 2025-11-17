import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isloogedGuard } from './islooged-guard';

describe('isloogedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloogedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
