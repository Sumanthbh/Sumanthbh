import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterBidsComponent } from './enter-bids.component';

describe('EnterBidsComponent', () => {
  let component: EnterBidsComponent;
  let fixture: ComponentFixture<EnterBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
