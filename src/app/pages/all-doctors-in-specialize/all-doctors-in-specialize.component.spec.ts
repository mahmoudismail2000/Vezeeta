import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDoctorsInSpecializeComponent } from './all-doctors-in-specialize.component';

describe('AllDoctorsInSpecializeComponent', () => {
  let component: AllDoctorsInSpecializeComponent;
  let fixture: ComponentFixture<AllDoctorsInSpecializeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllDoctorsInSpecializeComponent]
    });
    fixture = TestBed.createComponent(AllDoctorsInSpecializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
