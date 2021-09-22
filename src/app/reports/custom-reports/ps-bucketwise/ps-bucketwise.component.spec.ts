import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsBucketwiseComponent } from './ps-bucketwise.component';

describe('PsBucketwiseComponent', () => {
  let component: PsBucketwiseComponent;
  let fixture: ComponentFixture<PsBucketwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsBucketwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsBucketwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
