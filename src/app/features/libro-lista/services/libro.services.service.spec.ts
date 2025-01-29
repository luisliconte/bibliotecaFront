import { TestBed } from '@angular/core/testing';

import { LibroServicesService } from './libro.services.service';

describe('LibroListaServicesService', () => {
  let service: LibroServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
