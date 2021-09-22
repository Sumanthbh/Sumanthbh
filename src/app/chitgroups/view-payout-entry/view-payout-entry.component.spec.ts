import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayoutEntryComponent } from './view-payout-entry.component';

describe('ViewPayoutEntryComponent', () => {
  let component: ViewPayoutEntryComponent;
  let fixture: ComponentFixture<ViewPayoutEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPayoutEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayoutEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
