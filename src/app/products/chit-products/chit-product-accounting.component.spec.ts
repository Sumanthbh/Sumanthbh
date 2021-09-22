import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitProductAccountingComponent } from './chit-product-accounting.component';

describe('ChitProductAccountingComponent', () => {
  let component: ChitProductAccountingComponent;
  let fixture: ComponentFixture<ChitProductAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitProductAccountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitProductAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
