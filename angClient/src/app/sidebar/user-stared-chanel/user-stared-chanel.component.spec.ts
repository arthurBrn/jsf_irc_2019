import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStaredChanelComponent } from './user-stared-chanel.component';

describe('UserStaredChanelComponent', () => {
  let component: UserStaredChanelComponent;
  let fixture: ComponentFixture<UserStaredChanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStaredChanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStaredChanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
