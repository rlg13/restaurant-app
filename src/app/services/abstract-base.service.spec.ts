import { TestBed } from '@angular/core/testing';

import { AbstractBaseService } from './abstract-base.service';

describe('AbstractBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractBaseService = TestBed.get(AbstractBaseService);
    expect(service).toBeTruthy();
  });
});
