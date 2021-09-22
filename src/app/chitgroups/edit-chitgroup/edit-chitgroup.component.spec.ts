import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChitGroupComponent } from './edit-chitgroup.component';

describe('EditChitGroupComponent', () => {
  let component: EditChitGroupComponent;
  let fixture: ComponentFixture<EditChitGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChitGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.editComponent(EditChitGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should edit', () => {
    expect(component).toBeTruthy();
  });
});
