import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorTabComponent } from './guarantor-tab.component';

describe('GuarantorTabComponent', () => {
  let component: GuarantorTabComponent;
  let fixture: ComponentFixture<GuarantorTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
