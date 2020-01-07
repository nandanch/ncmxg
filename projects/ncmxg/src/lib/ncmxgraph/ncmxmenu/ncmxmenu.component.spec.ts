import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmxmenuComponent } from './ncmxmenu.component';

describe('NcmxmenuComponent', () => {
  let component: NcmxmenuComponent;
  let fixture: ComponentFixture<NcmxmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcmxmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcmxmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
