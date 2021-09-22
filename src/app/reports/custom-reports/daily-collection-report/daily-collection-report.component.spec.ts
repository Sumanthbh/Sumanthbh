import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCollectionReportComponent } from './daily-collection-report.component';

describe('DailyCollectionReportComponent', () => {
  let component: DailyCollectionReportComponent;
  let fixture: ComponentFixture<DailyCollectionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCollectionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
