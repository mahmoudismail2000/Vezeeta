import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentsdoctorBookingsComponent } from './add-appointmentsdoctor-bookings.component';

describe('AddAppointmentsdoctorBookingsComponent', () => {
  let component: AddAppointmentsdoctorBookingsComponent;
  let fixture: ComponentFixture<AddAppointmentsdoctorBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAppointmentsdoctorBookingsComponent]
    });
    fixture = TestBed.createComponent(AddAppointmentsdoctorBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
