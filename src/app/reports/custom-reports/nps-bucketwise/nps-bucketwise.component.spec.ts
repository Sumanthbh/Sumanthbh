import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsBucketwiseComponent } from './nps-bucketwise.component';

describe('NpsBucketwiseComponent', () => {
  let component: NpsBucketwiseComponent;
  let fixture: ComponentFixture<NpsBucketwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsBucketwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsBucketwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
