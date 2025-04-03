import { TestBed } from '@angular/core/testing';

import { FollowersFollowingService } from './followers-following.service';

describe('FollowersFollowingService', () => {
  let service: FollowersFollowingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowersFollowingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
