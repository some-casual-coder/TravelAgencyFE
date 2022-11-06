import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewHotelsComponent } from './user-view-hotels.component';

describe('UserViewHotelsComponent', () => {
  let component: UserViewHotelsComponent;
  let fixture: ComponentFixture<UserViewHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewHotelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
