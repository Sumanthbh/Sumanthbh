import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitChargeConfigComponent } from './chit-charges-configuration/chit-charge-config.component';

describe('ChitChargeConfigComponent', () => {
  let component: ChitChargeConfigComponent;
  let fixture: ComponentFixture<ChitChargeConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitChargeConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitChargeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
