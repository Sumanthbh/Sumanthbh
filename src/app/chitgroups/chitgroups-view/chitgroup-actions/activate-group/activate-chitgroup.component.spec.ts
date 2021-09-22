import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateChitGroupComponent } from './activate-chitgroup.component';

describe('ActivateChitGroupComponent', () => {
  let component: ActivateChitGroupComponent;
  let fixture: ComponentFixture<ActivateChitGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateChitGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateChitGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
