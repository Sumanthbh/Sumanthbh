import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFinDetailStepComponent } from './client-fin-detail-step.component';

describe('ClientFinDetailStepComponent', () => {
  let component: ClientFinDetailStepComponent;
  let fixture: ComponentFixture<ClientFinDetailStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFinDetailStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFinDetailStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
