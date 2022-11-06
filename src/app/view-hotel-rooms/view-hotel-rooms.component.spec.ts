import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelRoomsComponent } from './view-hotel-rooms.component';

describe('ViewHotelRoomsComponent', () => {
  let component: ViewHotelRoomsComponent;
  let fixture: ComponentFixture<ViewHotelRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHotelRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHotelRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
