import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonStartedGroupDailyCollectionComponent } from './non-started-group-daily-collection.component';

describe('NonStartedGroupDailyCollectionComponent', () => {
  let component: NonStartedGroupDailyCollectionComponent;
  let fixture: ComponentFixture<NonStartedGroupDailyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonStartedGroupDailyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonStartedGroupDailyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
