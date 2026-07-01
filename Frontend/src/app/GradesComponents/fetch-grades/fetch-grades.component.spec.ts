import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchGradesComponent } from './fetch-grades.component';

describe('FetchGradesComponent', () => {
  let component: FetchGradesComponent;
  let fixture: ComponentFixture<FetchGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
