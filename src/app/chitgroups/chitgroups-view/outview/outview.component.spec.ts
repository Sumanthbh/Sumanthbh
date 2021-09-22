import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutviewComponent } from './outview.component';

describe('OutviewComponent', () => {
  let component: OutviewComponent;
  let fixture: ComponentFixture<OutviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
