import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchDoctorComponent } from './fetch-doctor.component';

describe('FetchDoctorComponent', () => {
  let component: FetchDoctorComponent;
  let fixture: ComponentFixture<FetchDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
