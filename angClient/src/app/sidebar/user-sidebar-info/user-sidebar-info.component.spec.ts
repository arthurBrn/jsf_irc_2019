import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidebarInfoComponent } from './user-sidebar-info.component';

describe('UserSidebarInfoComponent', () => {
  let component: UserSidebarInfoComponent;
  let fixture: ComponentFixture<UserSidebarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSidebarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidebarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
