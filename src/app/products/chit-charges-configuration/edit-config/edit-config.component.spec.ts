import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitEditConfigComponent } from './edit-config.component';

describe('ChitEditConfigComponent', () => {
  let component: ChitEditConfigComponent;
  let fixture: ComponentFixture<ChitEditConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitEditConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitEditConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
