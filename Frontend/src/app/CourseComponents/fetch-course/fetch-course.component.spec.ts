import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCourseComponent } from './fetch-course.component';

describe('FetchCourseComponent', () => {
  let component: FetchCourseComponent;
  let fixture: ComponentFixture<FetchCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
