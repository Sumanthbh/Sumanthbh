import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeApprovalComponent } from './charge-approval.component';

describe('ChargeApprovalComponent', () => {
  let component: ChargeApprovalComponent;
  let fixture: ComponentFixture<ChargeApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
