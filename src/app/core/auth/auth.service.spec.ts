import { TestBed } from '@angular/core/testing';

import { AuthServices } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServices = TestBed.get(AuthServices);
    expect(service).toBeTruthy();
  });
});
