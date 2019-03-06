import { TestBed } from '@angular/core/testing';

import { DinamicService } from './dinamic.service';

describe('DinamicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinamicService = TestBed.get(DinamicService);
    expect(service).toBeTruthy();
  });
});
