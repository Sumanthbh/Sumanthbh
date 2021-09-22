import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientFinDetailsComponent } from  './fin-detail-tab.component';

describe('EditClientFinDetailsComponent', () => {
  let component: EditClientFinDetailsComponent;
  let fixture: ComponentFixture<EditClientFinDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientFinDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientFinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
