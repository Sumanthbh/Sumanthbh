import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitCreateProductComponent } from './create-product.component';

describe('ChitCreateProductComponent', () => {
  let component: ChitCreateProductComponent;
  let fixture: ComponentFixture<ChitCreateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitCreateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
