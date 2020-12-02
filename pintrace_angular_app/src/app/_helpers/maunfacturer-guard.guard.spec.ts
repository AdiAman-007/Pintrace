import { TestBed } from '@angular/core/testing';

import { MaunfacturerGuardGuard } from './maunfacturer-guard.guard';

describe('MaunfacturerGuardGuard', () => {
  let guard: MaunfacturerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MaunfacturerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
