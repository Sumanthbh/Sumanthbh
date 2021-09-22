import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChitAdvanceComponent } from './pay-chit-advance.component';

describe('PayChitAdvanceComponent', () => {
  let component: PayChitAdvanceComponent;
  let fixture: ComponentFixture<PayChitAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChitAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChitAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
