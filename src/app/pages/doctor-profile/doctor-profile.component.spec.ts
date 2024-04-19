import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileComponent } from './doctor-profile.component';

describe('DoctorProfileComponent', () => {
  let component: DoctorProfileComponent;
  let fixture: ComponentFixture<DoctorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DoctorProfileComponent]
    });
    fixture = TestBed.createComponent(DoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
