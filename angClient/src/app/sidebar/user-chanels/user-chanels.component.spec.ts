import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChanelsComponent } from './user-chanels.component';

describe('UserChanelsComponent', () => {
  let component: UserChanelsComponent;
  let fixture: ComponentFixture<UserChanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
