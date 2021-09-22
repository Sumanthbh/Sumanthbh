import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitProductsConfigurationComponent } from './chit-products-configuration.component';

describe('ChitProductsConfigurationComponent', () => {
  let component: ChitProductsConfigurationComponent;
  let fixture: ComponentFixture<ChitProductsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitProductsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitProductsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
