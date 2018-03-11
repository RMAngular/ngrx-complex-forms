import { TestBed, inject } from '@angular/core/testing';

import { LineItemService } from './line-item.service';

describe('LineItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineItemService]
    });
  });

  it('should be created', inject([LineItemService], (service: LineItemService) => {
    expect(service).toBeTruthy();
  }));
});
