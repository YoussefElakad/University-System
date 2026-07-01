import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFacultyComponent } from './fetch-faculty.component';

describe('FetchFacultyComponent', () => {
  let component: FetchFacultyComponent;
  let fixture: ComponentFixture<FetchFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
