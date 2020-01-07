import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmxgraphComponent } from './ncmxgraph.component';

describe('NcmxgraphComponent', () => {
  let component: NcmxgraphComponent;
  let fixture: ComponentFixture<NcmxgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcmxgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcmxgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
