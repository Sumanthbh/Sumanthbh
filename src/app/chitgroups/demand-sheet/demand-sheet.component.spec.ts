import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandSheetComponent } from './demand-sheet.component';

describe('DemandSheetComponent', () => {
  let component: DemandSheetComponent;
  let fixture: ComponentFixture<DemandSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
