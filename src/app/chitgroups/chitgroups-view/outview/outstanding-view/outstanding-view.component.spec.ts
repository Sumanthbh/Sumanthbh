import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingViewComponent } from './outstanding-view.component';

describe('OutstandingViewComponent', () => {
  let component: OutstandingViewComponent;
  let fixture: ComponentFixture<OutstandingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
