import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeansOfTransportComponent } from './means-of-transport.component';

describe('MeansOfTransportComponent', () => {
  let component: MeansOfTransportComponent;
  let fixture: ComponentFixture<MeansOfTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeansOfTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeansOfTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
