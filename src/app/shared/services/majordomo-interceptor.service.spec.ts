import { TestBed, inject } from '@angular/core/testing';

import { MajordomoInterceptorService } from './majordomo-interceptor.service';

describe('MajordomoInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MajordomoInterceptorService]
    });
  });

  it('should be created', inject([MajordomoInterceptorService], (service: MajordomoInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
