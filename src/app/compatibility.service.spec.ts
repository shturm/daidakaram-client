/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompatibilityService } from './compatibility.service';

describe('Service: Compatibility', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompatibilityService]
    });
  });

  it('should ...', inject([CompatibilityService], (service: CompatibilityService) => {
    expect(service).toBeTruthy();
  }));
});
