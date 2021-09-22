import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuarantorComponent } from './add-guarantor.component';

describe('AddGuarantorComponent', () => {
  let component: AddGuarantorComponent;
  let fixture: ComponentFixture<AddGuarantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuarantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
