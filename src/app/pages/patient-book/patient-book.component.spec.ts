import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBookComponent } from './patient-book.component';

describe('PatientBookComponent', () => {
  let component: PatientBookComponent;
  let fixture: ComponentFixture<PatientBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PatientBookComponent]
    });
    fixture = TestBed.createComponent(PatientBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
