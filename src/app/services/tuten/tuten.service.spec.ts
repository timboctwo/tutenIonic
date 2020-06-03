import { TestBed } from '@angular/core/testing';

import { TutenService } from './tuten.service';

describe('TutenService', () => {
  let service: TutenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
