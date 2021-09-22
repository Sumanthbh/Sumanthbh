import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSubscriberComponent } from './advance-subscriber.component';

describe('AdvanceSubscriberComponent', () => {
  let component: AdvanceSubscriberComponent;
  let fixture: ComponentFixture<AdvanceSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
