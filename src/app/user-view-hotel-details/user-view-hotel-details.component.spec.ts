import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewHotelDetailsComponent } from './user-view-hotel-details.component';

describe('UserViewHotelDetailsComponent', () => {
  let component: UserViewHotelDetailsComponent;
  let fixture: ComponentFixture<UserViewHotelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewHotelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewHotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
