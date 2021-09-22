import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChitGroupComponent } from './create-chitgroup.component';

describe('CreateChitGroupComponent', () => {
  let component: CreateChitGroupComponent;
  let fixture: ComponentFixture<CreateChitGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChitGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChitGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
