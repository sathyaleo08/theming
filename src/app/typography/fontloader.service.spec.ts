/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FontloaderService } from './fontloader.service';

describe('Service: Fontloader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FontloaderService]
    });
  });

  it('should ...', inject([FontloaderService], (service: FontloaderService) => {
    expect(service).toBeTruthy();
  }));
});
