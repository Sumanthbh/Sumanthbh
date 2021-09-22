import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitEditProductComponent } from './edit-product.component';

describe('ChitEditProductComponent', () => {
  let component: ChitEditProductComponent;
  let fixture: ComponentFixture<ChitEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
