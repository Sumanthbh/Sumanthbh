import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitViewProductComponent } from './view-product.component';

describe('ChitViewProductComponent', () => {
  let component: ChitViewProductComponent;
  let fixture: ComponentFixture<ChitViewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitViewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
