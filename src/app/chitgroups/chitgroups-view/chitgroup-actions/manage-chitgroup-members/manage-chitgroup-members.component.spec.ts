import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChitGroupMembersComponent } from './manage-chitgroup-members.component';

describe('ManageChitGroupMembersComponent', () => {
  let component: ManageChitGroupMembersComponent;
  let fixture: ComponentFixture<ManageChitGroupMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChitGroupMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChitGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
