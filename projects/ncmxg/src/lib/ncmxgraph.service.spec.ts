import { TestBed } from '@angular/core/testing';

import { NcmxgraphService } from './ncmxgraph.service';

describe('NcmxgraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NcmxgraphService = TestBed.get(NcmxgraphService);
    expect(service).toBeTruthy();
  });
});
