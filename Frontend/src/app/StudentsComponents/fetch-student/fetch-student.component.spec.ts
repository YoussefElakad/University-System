import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchStudentComponent } from './fetch-student.component';

describe('FetchStudentComponent', () => {
  let component: FetchStudentComponent;
  let fixture: ComponentFixture<FetchStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
