import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnameComponent } from './sname.component';

describe('SnameComponent', () => {
  let component: SnameComponent;
  let fixture: ComponentFixture<SnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
