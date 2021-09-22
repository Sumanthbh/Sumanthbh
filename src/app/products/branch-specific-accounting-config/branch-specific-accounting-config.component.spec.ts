import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSpecificAccountingConfigComponent } from './branch-specific-accounting-config.component';

describe('BranchSpecificAccountingConfigComponent', () => {
  let component: BranchSpecificAccountingConfigComponent;
  let fixture: ComponentFixture<BranchSpecificAccountingConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchSpecificAccountingConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSpecificAccountingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
