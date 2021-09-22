import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitCreateConfigComponent } from './create-charge.component';

describe('ChitCreateConfigComponent', () => {
  let component: ChitCreateConfigComponent;
  let fixture: ComponentFixture<ChitCreateConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitCreateConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitCreateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
