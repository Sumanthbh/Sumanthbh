import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitViewConfigComponent } from './view-config.component';

describe('ViewChargeComponent', () => {
  let component: ChitViewConfigComponent;
  let fixture: ComponentFixture<ChitViewConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitViewConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitViewConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
