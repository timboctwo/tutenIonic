import { TestBed } from '@angular/core/testing';

import { UserInterfaceElementsService } from './user-interface-elements.service';

describe('UserInterfaceElementsService', () => {
  let service: UserInterfaceElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInterfaceElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
