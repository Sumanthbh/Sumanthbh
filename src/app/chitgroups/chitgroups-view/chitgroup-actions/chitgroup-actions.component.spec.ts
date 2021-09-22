import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitGroupActionsComponent } from './chitgroup-actions.component';

describe('ChitGroupActionsComponent', () => {
  let component: ChitGroupActionsComponent;
  let fixture: ComponentFixture<ChitGroupActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitGroupActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitGroupActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
