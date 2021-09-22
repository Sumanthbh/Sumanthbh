import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitGroupsViewComponent } from './chitgroups-view.component';

describe('ChitGroupsViewComponent', () => {
  let component: ChitGroupsViewComponent;
  let fixture: ComponentFixture<ChitGroupsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitGroupsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitGroupsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
