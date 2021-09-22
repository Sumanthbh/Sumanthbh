import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChitChargeComponent } from './pay-chit-charge.component';

describe('PayChitChargeComponent', () => {
  let component: PayChitChargeComponent;
  let fixture: ComponentFixture<PayChitChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChitChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChitChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
